import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from './sanity.api'



import type { PreviewData } from 'next'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: {
  token: string
  perspective: PreviewData
}): SanityClient {
  const client = createClient({
    projectId: 'nv63bt3c',
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
  projectId: 'nv63bt3c',
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})


