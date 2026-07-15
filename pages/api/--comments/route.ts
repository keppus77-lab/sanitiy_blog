import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { client } from '@/lib/sanity.client'

// GET - Kommentare abrufen
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get('postId')
  
  if (!postId) {
    return NextResponse.json({ error: 'Post ID erforderlich' }, { status: 400 })
  }
  
  const comments = await client.fetch(
    `*[_type == "comment" && post._ref == $postId && approved == true] | order(createdAt desc) {
      _id,
      content,
      createdAt,
      edited,
      editedAt,
      "author": author->{name, image},
      "replies": *[_type == "comment" && parentComment._ref == ^._id && approved == true] | order(createdAt asc) {
        _id,
        content,
        createdAt,
        edited,
        editedAt,
        "author": author->{name, image}
      }
    }`,
    { postId }
  )
  
  return NextResponse.json(comments)
}

// POST - Neuen Kommentar erstellen
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }
  
  const { postId, content, parentCommentId } = await request.json()
  
  if (!postId || !content) {
    return NextResponse.json({ error: 'Fehlende Daten' }, { status: 400 })
  }
  
  // User aus Sanity holen
  const user = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    { email: session.user.email }
  )
  
  if (!user) {
    return NextResponse.json({ error: 'Benutzer nicht gefunden' }, { status: 404 })
  }
  
  if (user.blocked) {
    return NextResponse.json({ error: 'Benutzer ist gesperrt' }, { status: 403 })
  }
  
  // Kommentar erstellen
  const comment = await client.create({
    _type: 'comment',
    post: { _type: 'reference', _ref: postId },
    author: { _type: 'reference', _ref: user._id },
    content,
    approved: user.role === 'admin' || user.role === 'moderator', // Auto-approve für Admins
    ...(parentCommentId && {
      parentComment: { _type: 'reference', _ref: parentCommentId }
    }),
    createdAt: new Date().toISOString()
  })
  
  return NextResponse.json(comment, { status: 201 })
}