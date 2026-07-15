import groq from 'groq'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  subtitle,
  "slug": slug.current,
  "author": author->{name, picture},
  "category": category->{title, "slug": slug.current} 
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  category: {
    title?: string
    slug?: string
  },
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
  emoji?: string
  subtitle?: string


}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
  export const categoriesQuery = groq`
    *[_type == "category"] | order(title asc) {
      title,
      slug: slug.current
    }
  `;

  // lib/sanity.category.ts (oder wo du Queries sammelst)
import { client } from './sanity.client'

export async function getCategoryPage(categorySlug: string, page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return client.fetch(
    `{
      "category": *[_type == "category" && slug.current == $categorySlug][0]{
        title,
        description,
        "slug": slug.current
      },
      "total": count(*[_type == "post" && category->slug.current == $categorySlug]),
      "posts": *[_type == "post" && category->slug.current == $categorySlug]
        | order(date desc)[$start...$end]{
          _id,
          title,
          "slug": slug.current,
          excerpt,
          date,
          coverImage
        }
    }`,
    { categorySlug, start, end }
  )
}