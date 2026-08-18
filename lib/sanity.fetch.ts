import { SanityClient } from "next-sanity"
import { categoriesQuery, headerLinks, indexQuery, Post, postAndMoreStoriesQuery, postBySlugQuery, postSlugsQuery, Settings, settingsQuery, tagsQuery } from "./sanity.queries"
import { getClient } from "./sanity.client"

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
        { slug: string; categorySlug: string} []
    >(postSlugsQuery)

    const test = posts.map((post) => ({
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
    slug: string
    ): Promise<Post> {
    return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getPostAndMoreStories(
    client: SanityClient,
    slug: string
    ): Promise<{ post: Post; morePosts: Post[]} > {
    return await client.fetch(postAndMoreStoriesQuery, { slug })
}

export async function getAllCategories(client: SanityClient): Promise<Pick<Record<string, any>, 'title' | 'slug'>[]> {
    const response = await client.fetch(categoriesQuery)
    return response || []
}

export async function getAllTags(client: SanityClient): Promise<Pick<Record<string, any>, 'title' | 'slug'>[]> {
    const response = await client.fetch(tagsQuery)
    return response || []
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