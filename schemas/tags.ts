import { defineField, defineType } from 'sanity'
import { MdOutlineGrid3X3 } from 'react-icons/md'
import type { Rule } from 'sanity'

export default defineType({
  name: 'tags',
  title: 'Tags',
  type: 'document',
  icon: MdOutlineGrid3X3,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text'
    })
  ]
})