import { defineField, defineType } from 'sanity'
import { MdOutlineGrid3X3 } from 'react-icons/md'
import { type Settings, settingsQuery, type Post, indexQuery, postSlugsQuery, postBySlugQuery, postAndMoreStoriesQuery, categoriesQuery, tagsQuery, headerLinks } from 'lib/sanity.queries'
import type { PreviewData } from 'next'
import { type SanityClient, createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, studioUrl, useCdn } from 'lib/sanity.api'

// leave validation untyped so Sanity's validation builder types are inferred

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
            validation: (rule) => rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
        validation: (rule) => rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Beschreibung',
            type: 'text'
        })
    ]
})
export function getClient(preview?: {
  token: string
  perspective: PreviewData
}): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: { enabled: preview?.token ? true : false, studioUrl },
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: typeof preview.perspective === 'string'
        ? preview.perspective.split(',')
        : 'drafts',
    })
  }
  return client
}







export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})
