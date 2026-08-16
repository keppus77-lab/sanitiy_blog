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
  "author": author->{name, picture, role},
  "category": category->{title, "slug": slug.current},
  "tags": tags[]->{
    title,
    "slug": slug.current
  }
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
*[_type == "post" && defined(slug.current)][]{
  "slug": slug,
  "categorySlug": category->slug.current
  }
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export interface Author {
  name?: string
  role?: string
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
  tags?: any,
  excerpt?: string
  author?: Author
  slug?: string
  content?: string
  emoji?: string
  subtitle?: string


}
export interface NavItem {
    _id: string
    linkType: string
    openInNewTab: boolean
    title: string
    url?: string
}

export interface footerLinks {
    _id: string
    title: string
    slug: string
    linkType: string
    url?: string
    openInNewTab: boolean
}

 
 


export interface SiteSetting {
  siteTitle: string
  headerLinks: NavItem[]
  siteSubtitle: string
  logo: any
  footerHeadline: string
  footerText: string
  copyright: string
  footerLinks: footerLinks[]
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
      "slug": slug.current
    }
  `;

  export const tagsQuery = groq`
    *[_type == "tags"] | order(title asc) {
      title,
      "slug": slug.current
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
      "posts": *[_type == "post" && (category->slug.current == $categorySlug
      || $categorySlug in categories[]->slug.current
      )]
        | order(date desc)[$start...$end]{
          ${postFields}
         
           
        }
    }`,
    { categorySlug, start, end }
  )
}

export async function getTagPage(tagSlug: string, page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return client.fetch(
    `{
      "tag": *[_type == "tags" && slug.current == $tagSlug][0]{
      _id,
      title,
      "slug": slug.current,
      description
    },
    "posts": *[_type == "post" && $tagSlug in tags[]->slug.current]
      | order(date desc) [${start}...${end}] {
        ${postFields}
      },
    "total": count(*[_type == "post" && $tagSlug in tags[]->slug.current])
    }`,
    { tagSlug, start, end }
  )
}

export const headerLinks = groq`
*[_type == "settings"][0]{
  siteTitle,
  siteSubtitle,
  HeroHeadline,
  HeroSubtitle,
  logo,
  showSearch,
  "headerLinks": headerLinks[]->{
    _id,
    title,
    slug,
    linkType,
    "url": coalesce(
        select(
            linkType == "category" => "#",
            linkType == "tags" => "#",
            linkType == "post" => "/blog/" + postLink->category->slug.current + "/" + postLink->slug.current,
            linkType == "page" => "/" + pageLink->slug.current,
            linkType == "external" => externalUrl,
            linkType == "home" => "/"
        ),
        ""
        ),
    openInNewTab
  },
  footerHeadline,
  footerText,
  copyright,
  "footerLinks": footerLinks[]->{
    _id,
    title,
    slug,
    linkType,
    "url": coalesce(
        select(
            linkType == "category" => "#",
            linkType == "tags" => "#",
            linkType == "post" => "/blog/" + postLink->category->slug.current + "/" + postLink->slug.current,
            linkType == "page" => "/" + pageLink->slug.current,
            linkType == "external" => externalUrl,
            linkType == "home" => "/"
        ),
        ""
        ),
    openInNewTab,
    
  },
  socialLinks
  
 
}
  `;
