import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import {
  indexQuery,
  type Post,
  type NavItem,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,  
  type Settings,
  settingsQuery,
  categoriesQuery,
  tagsQuery,
  headerLinks
  
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
      perspective:
        typeof preview.perspective === 'string'
          ? preview.perspective.split(',')
          : 'drafts',
    })
  }
  return client
}

export const getSanityImageConfig = () => getClient()

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {}
}

export async function getAllPosts(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(indexQuery)) || []
}

export async function getAllPostsSlugs__(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getAllPostsSlugs() {
  const client = getClient()

  const posts = await client.fetch<
    { slug: string; categorySlug: string }[]
  >(postSlugsQuery)

const test  = posts.map((post) => ({
    category: post.categorySlug,
    slug: post.slug,
  }))
  

  return posts.map((post) => ({
    category: post.categorySlug,
    slug: post.slug,
  }))
}

export async function getPostBySlug(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getPostAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(postAndMoreStoriesQuery, { slug })
}

export async function getAllCategories(client: SanityClient): Promise<Pick<Record<string, any>, 'title' | 'slug'>[]> {
    const response = await client.fetch(categoriesQuery);
    return response || [];
  }

export async function getAllTags(client: SanityClient): Promise<Pick<Record<string, any>, 'title' | 'slug'>[]> {
    const response = await client.fetch(tagsQuery);
    return response || [];
  }  

export async function getNavi(client: SanityClient) {
  try {
    const response = await client.fetch(headerLinks)
  
    return response 
  } catch (e) {
    console.error(e)
    throw e
  }
}





export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

