'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface CommentFormProps {
  postId: string
  parentCommentId?: string
  onCommentAdded: () => void
  onCancel?: () => void
}

export function CommentForm({ 
  postId, 
  parentCommentId, 
  onCommentAdded,
  onCancel 
}: CommentFormProps) {
  const { data: session } = useSession()
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) return

    setSubmitting(true)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: content.trim(),
          parentCommentId
        })
      })

      if (res.ok) {
        setContent('')
        onCommentAdded()
        if (onCancel) onCancel()
      } else {
        const error = await res.json()
        alert(error.error || 'Fehler beim Speichern')
      }
    } catch (error) {
      console.error('Fehler:', error)
      alert('Ein Fehler ist aufgetreten')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        {session?.user?.image && (
          <img
            src={session.user.image}
            alt={session.user.name || ''}
            className="w-10 h-10 rounded-full"
          />
        )}

        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={parentCommentId ? 'Antworten...' : 'Schreibe einen Kommentar...'}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows={4}
            maxLength={1000}
            disabled={submitting}
          />
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-500">
              {content.length}/1000 Zeichen
            </span>
            
            <div className="flex gap-2">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Abbrechen
                </button>
              )}
              <button
                type="submit"
                disabled={!content.trim() || submitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? 'Wird gesendet...' : 'Kommentieren'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}