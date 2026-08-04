import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { client } from '../../../lib/sanity.client'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { postId } = req.query

      if (!postId) {
        return res.status(400).json({
          error: 'Post ID erforderlich',
        })
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

      return res.status(200).json(comments)
    }

    if (req.method === 'POST') {
      const session = await getServerSession(req, res, authOptions)

      if (!session?.user) {
        return res.status(401).json({
          error: 'Nicht authentifiziert',
        })
      }

      const { postId, content, parentCommentId } = req.body

      if (!postId || !content) {
        return res.status(400).json({
          error: 'Fehlende Daten',
        })
      }

      const user = await client.fetch(
        `*[_type == "user" && email == $email][0]`,
        { email: session.user.email }
      )

      if (!user) {
        return res.status(404).json({
          error: 'Benutzer nicht gefunden',
        })
      }

      if (user.blocked) {
        return res.status(403).json({
          error: 'Benutzer ist gesperrt',
        })
      }

      const comment = await client.create({
        _type: 'comment',
        post: {
          _type: 'reference',
          _ref: postId,
        },
        author: {
          _type: 'reference',
          _ref: user._id,
        },
        content,
        approved:
          user.role === 'admin' ||
          user.role === 'moderator',
        ...(parentCommentId && {
          parentComment: {
            _type: 'reference',
            _ref: parentCommentId,
          },
        }),
        createdAt: new Date().toISOString(),
      })

      return res.status(201).json(comment)
    }

    return res.status(405).json({
      error: 'Methode nicht erlaubt',
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      error: 'Interner Serverfehler',
    })
  }
}