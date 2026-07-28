import {GetStaticPaths, GetStaticProps} from 'next'
import {groq} from 'next-sanity'

import { getAllPosts, getClient, getSettings } from '../lib/sanity.client'
import {PortableText} from '@portabletext/react'
import Head from 'next/head'

interface Page {
  _id: string
  title: string
  slug: {current: string}
  content: any[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  publishedAt: string
}

interface PageProps {
  page: Page
}

export default function Page({page}: PageProps) {
  const metaTitle = page.seo?.metaTitle || page.title
  const metaDescription = page.seo?.metaDescription || ''

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
      </Head>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
        
        <div className="prose prose-lg max-w-none">
          <PortableText 
            value={page.content}
            components={{
              block: {
                h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
                normal: ({children}) => <p className="mb-4">{children}</p>,
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
                    {children}
                  </blockquote>
                ),
              },
              marks: {
                link: ({value, children}) => (
                  <a href={value?.href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = groq`*[_type == "page"]{ "slug": slug.current }`
  const pages = await getClient().fetch<{slug: string}[]>(query)

  const paths = pages.map((page) => ({
    params: {slug: page.slug},
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = params?.slug as string

  const query = groq`*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    content,
    seo,
    publishedAt
  }`

  const page = await getClient().fetch<Page>(query, {slug})

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {page},
    revalidate: 60, // ISR: Revalidate every 60 seconds
  }
}