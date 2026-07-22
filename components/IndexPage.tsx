import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import HeroPost from 'components/HeroPost'
import IndexPageHead from 'components/IndexPageHead'
import MoreStories from 'components/MoreStories'
import BlogHeaderNavi from 'components/BlogHeaderNavi'

import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'
import { Suspense } from 'react'
import AuroraHero from './AuroraHero'
import WaldarbeitBlog from './test'
import PostHero from './PostHero'
import HomepageHero from './HomerpageHero'
import HeroKlaus from './HeroKlaus'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings } = props
  const [heroPost, ...morePosts] = posts || []
  const { title = demo.title, description = demo.description } = settings || {}



  return (
    <>
      <IndexPageHead settings={settings} />
      
      <Layout preview={preview} loading={loading}>
         <HeroKlaus  title={title} description={description} />
          <BlogHeader title={title} description={description} level={4} />

          {heroPost && (
            <HomepageHero
            description={description}
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              subtitle={heroPost.subtitle}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              category={heroPost.category}
              emoji={heroPost.emoji || '🚜'}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        
      
      <WaldarbeitBlog />
      <AuroraHero />
      </Layout>
    </>
  )
}