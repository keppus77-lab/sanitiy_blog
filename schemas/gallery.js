import {defineField, defineType} from 'sanity'
import { MdPhotoLibrary } from 'react-icons/md'

export default {
  name: 'gallery',
  title: 'Galerie',
  type: 'document',
  icon: MdPhotoLibrary,
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 4
    },
    {
      name: 'coverImage',
      title: 'Cover Bild',
      type: 'image',
      description: 'Hauptbild für die Galerievorschau',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      title: 'Kategorien',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }]
        }
      ]
    },
    {
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          title: 'Galeriebild',
          fields: [
            {
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              title: 'Bildunterschrift',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Beschreibung',
              type: 'text',
              rows: 3
            },
            {
              name: 'order',
              title: 'Sortierung',
              type: 'number',
              hidden: true
            }
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'alt',
              media: 'image'
            }
          }
        }
      ],
      options: {
        layout: 'grid'
      },
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'featured',
      title: 'Featured Galerie',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'location',
      title: 'Standort',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Ort',
          type: 'string'
        },
        {
          name: 'coordinates',
          title: 'Koordinaten',
          type: 'geopoint'
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Veröffentlicht am',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'coverImage'
    }
  }
}