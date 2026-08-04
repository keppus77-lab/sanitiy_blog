export interface Comment {
    _id: string
    content: string
    createdAt: string
    edited: boolean
    editedAt?: string

    post: {
        _ref: string
    }

    author: {
        name: string
        image?: string
        email?: string
    }

    replies?: Comment[]
}