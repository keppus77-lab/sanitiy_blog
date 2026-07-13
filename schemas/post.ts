import { MdArticle, MdPerson, MdCategory } from 'react-icons/md'
import { defineField, defineType } from 'sanity'
import { format, parseISO } from 'date-fns'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: MdArticle,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }]
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Bild',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'date',
      title: 'Veröffentlichungsdatum',
      type: 'datetime',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Auszug',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            },
            {
              name: 'caption',
              title: 'Bildunterschrift',
              type: 'string'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'category',
      title: 'Hauptkategorie',
      type: 'reference',
      to: [{ type: 'category' }]
    }),
    defineField({
      name: 'categories',
      title: 'Kategorien',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }]
        }
      ] 
    })
  
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage'
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  }
})