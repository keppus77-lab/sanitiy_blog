import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import {
  type NavItem  
} from 'lib/sanity.queries'

import type { PreviewData } from 'next'
import { createClient, type SanityClient } from 'next-sanity'

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
    stega: { enabled: !!preview?.token, studioUrl },
  })

  if (preview) {
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective:
        typeof preview.perspective === 'string'
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


