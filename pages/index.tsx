import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getNavi, getClient, getSettings, getAllCategories, getAllTags, getAllPosts } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'


interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, settings, previewMode } = props

  if (previewMode) {
    return <PreviewIndexPage posts={posts} settings={settings} />
  }

  return (
    <main>
      <IndexPage posts={posts} settings={settings} />
    </main>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { preview: previewMode = false, previewData } = ctx
  const client = getClient(
    previewMode ? { token: readToken, perspective: previewData } : undefined,
  )
  const [settings, nav, categories, tags, posts] = await Promise.all([
    getSettings(client),
    getNavi(client),    
    getAllCategories(client),
    getAllTags(client),
    getAllPosts(client),
  ])
  

  return {
    props: {
      posts,
      settings,
      previewMode,
      nav: nav, 
      categories: categories, 
      tags: tags,
      previewPerspective: typeof previewData === 'string' ? previewData : null,
      token: previewMode ? readToken : '',
    },
  }
}