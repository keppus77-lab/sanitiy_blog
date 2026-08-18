import Layout from 'app/layout'
import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { getAllCategories, getAllPosts, getAllTags, getNavi, getSettings } from 'lib/sanity.fetch'

import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'


interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
  previewMode: boolean
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
    
      <IndexPage posts={posts} settings={settings} />
    
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