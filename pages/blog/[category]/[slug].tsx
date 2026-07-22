import PostPage from 'components/PostPage'
import PreviewPostPage from 'components/PreviewPostPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getPostAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'


interface PageProps extends SharedPageProps {
  post: Post
  morePosts: Post[]
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  

  const { settings, post, morePosts, previewMode } = props

  if (previewMode) {
    return (
      <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
    )
  }

  return (
  

  <PostPage post={post} morePosts={morePosts} settings={settings} />

  )
}


export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { preview: previewMode = false, previewData, params } = ctx

  const client = getClient(
    previewMode ? { token: readToken, perspective: previewData } : undefined
  )

  const slug = params?.slug
  const categoryFromUrl = params?.category

  if (!slug || !categoryFromUrl) return { notFound: true }

  const [settings, { post, morePosts }] = await Promise.all([
    getSettings(client),
    getPostAndMoreStories(client, slug),
  ])

  if (!post) return { notFound: true }

  const categoryFromPost = post.category?.slug // z.B. "wald"
  if (!categoryFromPost) return { notFound: true }

  // Wenn URL-Kategorie nicht zur Post-Kategorie passt -> Redirect auf kanonische URL
  if (categoryFromUrl !== categoryFromPost) {
    alert("rwer");
    return {
      redirect: {
        destination: `/blog/${categoryFromPost}/${post.slug}`, // ggf. post.slug.current je nach Typ
        permanent: true, // oder false, wenn du es erstmal testen willst
      },
    }
  }

  return {
    props: {
      post,
      morePosts,
      settings,
      previewMode,
      previewPerspective: typeof previewData === 'string' ? previewData : null,
      token: previewMode ? readToken : '',
    },
  }
}


export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs()

  const paths = (slugs || []).map((s) => {
    if (typeof s === 'string') {
      return {
        params: { category: 'blog', slug: s }
      }
    }
    
    const item: any = s
    const slug = (typeof item?.slug === 'object' ? item.slug?.current : item?.slug) || ''
    const category = (typeof item?.category === 'object' ? item.category?.slug : item?.category) || 'blog'
    
    return {
      params: { category, slug }  // ← Objekt mit params!
    }
  }).filter(Boolean)

  return {
    paths,
    fallback: 'blocking',
  }
}