'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { CommentForm } from './CommentForm'
import { CommentList } from './CommentList'

interface Comment {
  _id: string
  content: string
  createdAt: string
  edited: boolean
  editedAt?: string
  author: {
    name: string
    image?: string
  }
  replies?: Comment[]
}

interface CommentSectionProps {
  postId: string
}

export default function CommentSection({ postId }: CommentSectionProps) {

    const { data: session } = useSession()
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchComments()
    }, [postId])

    const fetchComments = async () => {
        try {
        const res = await fetch(`/api/comments?postId=${postId}`)
        const data = await res.json()
        setComments(data)
        } catch (error) {
        console.error('Fehler beim Laden der Kommentare:', error)
        } finally {
        setLoading(false)
        }
    }

    const handleCommentAdded = () => {
        fetchComments()
    }

    if (loading) {
        return <div className="text-center py-8">Lade Kommentare...</div>
    }

    return (
        <section className="mt-16 border-t border-gray-200 pt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Kommentare ({comments.length})
        </h2>

        {/* Kommentar-Formular */}
        {session ? (
            <CommentForm 
            postId={postId} 
            onCommentAdded={handleCommentAdded}
            />
        ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 text-center">
            <p className="text-gray-700 mb-4">
                Melde dich an, um einen Kommentar zu schreiben
            </p>
            <a
                href="/api/auth/signin"
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
                Anmelden
            </a>
            </div>
        )}

        {/* Kommentar-Liste */}
        <CommentList 
            comments={comments} 
            onCommentUpdated={fetchComments}
        />
        </section>
    )
}