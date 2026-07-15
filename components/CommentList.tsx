'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { CommentForm } from './CommentForm'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'

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

interface CommentListProps {
  comments: Comment[]
  onCommentUpdated: () => void
}

export function CommentList({ comments, onCommentUpdated }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Noch keine Kommentare. Sei der Erste!
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onCommentUpdated={onCommentUpdated}
        />
      ))}
    </div>
  )
}

function CommentItem({ 
  comment, 
  onCommentUpdated 
}: { 
  comment: Comment
  onCommentUpdated: () => void 
}) {
  const { data: session } = useSession()
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)

  const isAuthor = session?.user?.email === comment.author.email

  const handleEdit = async () => {
    try {
      const res = await fetch(`/api/comments/${comment._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent })
      })

      if (res.ok) {
        setIsEditing(false)
        onCommentUpdated()
      }
    } catch (error) {
      console.error('Fehler:', error)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Kommentar wirklich löschen?')) return

    try {
      const res = await fetch(`/api/comments/${comment._id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        onCommentUpdated()
      }
    } catch (error) {
      console.error('Fehler:', error)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
          {comment.author.image ? (
            <img src={comment.author.image} alt="" className="w-10 h-10 rounded-full" />
          ) : (
            comment.author.name.charAt(0).toUpperCase()
          )}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-900">
              {comment.author.name}
            </span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), { 
                addSuffix: true,
                locale: de 
              })}
            </span>
            {comment.edited && (
              <span className="text-xs text-gray-400">(bearbeitet)</span>
            )}
          </div>

          {/* Content */}
          {isEditing ? (
            <div className="mb-4">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Speichern
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">
              {comment.content}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 text-sm">
            {session && !isEditing && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Antworten
              </button>
            )}
            
            {isAuthor && !isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-600 hover:text-gray-700"
                >
                  Bearbeiten
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700"
                >
                  Löschen
                </button>
              </>
            )}
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-4 pl-4 border-l-2 border-green-200">
              <CommentForm
                postId={comment.post._ref}
                parentCommentId={comment._id}
                onCommentAdded={() => {
                  setShowReplyForm(false)
                  onCommentUpdated()
                }}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-6 pl-4 border-l-2 border-gray-200 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  onCommentUpdated={onCommentUpdated}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}