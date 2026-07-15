import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Kommentar',
  type: 'document',
  fields: [
    defineField({
      name: 'post',
      title: 'Artikel',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'text',
      validation: (Rule) => Rule.required().min(3).max(1000)
    }),
    defineField({
      name: 'approved',
      title: 'Freigegeben',
      type: 'boolean',
      initialValue: false,
      description: 'Muss von Moderator freigegeben werden'
    }),
    defineField({
      name: 'parentComment',
      title: 'Antwort auf',
      type: 'reference',
      to: [{ type: 'comment' }],
      description: 'Für verschachtelte Kommentare/Antworten'
    }),
    defineField({
      name: 'createdAt',
      title: 'Erstellt am',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'edited',
      title: 'Bearbeitet',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'editedAt',
      title: 'Bearbeitet am',
      type: 'datetime'
    })
  ],
  preview: {
    select: {
      content: 'content',
      author: 'author.name',
      post: 'post.title'
    },
    prepare({ content, author, post }) {
      return {
        title: content.substring(0, 50) + '...',
        subtitle: `Von ${author} auf "${post}"`
      }
    }
  }
})