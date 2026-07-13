import { client } from '../../../lib/sanity.client'
// ODER falls Sie die API aus einem anderen Ort importieren:
// import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'



interface Post {
  _id: string
  title: string
  slug: { current: string }
  category: {
    slug: { current: string }
    title: string
  }
  content: any
  date: string
  excerpt?: string
  author?: {
    name: string
  }
  coverImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
}

interface PageProps {
  params: {
    category: string
    slug: string
  }
}

 
// Post-Daten fetchen
async function getPost(category: string, slug: string) {
  const post = await client.fetch<Post>(
    `*[_type == "post" && slug.current == $slug && category->slug.current == $category][0] {
      _id,
      title,
      "slug": slug.current,
      "category": {
        "slug": category->slug.current,
        "title": category->title
      },
      content,
      date,
      excerpt,
      "author": author->{name},
      coverImage {
        asset->{url},
        alt
      }
    }`,
    { slug, category }
  )
console.table(post)
  return post
}

// Alle möglichen Routen generieren
export async function generateStaticParams() {
  const posts = await client.fetch<Array<{ slug: string; category: string }>>(
    `*[_type == "post" && defined(slug.current) && defined(category->slug.current)] {
      "slug": slug.current,
      "category": category->slug.current
    }`
  )

  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }))
}

// Page Componen

export default async function PostPage({ params }: PageProps) {
  const { category, slug } = params
  const post = await getPost(category, slug)

  if (!post) notFound()

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">Kategorie: {post.category.title}</p>
      {post.date && (
        <time className="text-sm text-gray-500">
          {new Date(post.date).toLocaleDateString('de-DE')}
        </time>
      )}
      {post.excerpt && <p className="mt-4 text-lg">{post.excerpt}</p>}
      {/* Hier Ihren Content rendern */}
    </article>
  )
}

// Metadata
export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = params
  const post = await getPost(category, slug)

  if (!post) {
    return {
      title: 'Post nicht gefunden',
    }
  }

  return {
    title: post.title,
    description: post.excerpt || post.title,
  }
}