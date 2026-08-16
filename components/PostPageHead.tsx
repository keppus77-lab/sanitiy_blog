import BlogMeta from 'components/BlogMeta'
import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import { Post, Settings } from 'lib/sanity.queries'
import Head from 'next/head'
import { stegaClean } from 'next-sanity'

export interface PostPageHeadProps {
  settings: Settings
  post: Post
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
  const title = settings.title ?? demo.title
  return (
    <Head>
      <title>
        {stegaClean(post.title ? `${post.title} | ${title}` : title)}
      </title>
      <BlogMeta />
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.category.slug}/${post.slug}`} />
      {post.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />

      )}
      {post.excerpt && (
        <meta name="description" content={post.excerpt} />
      )}
      <meta
        name="robots"
        content="index,follow,max-image-preview:large"
      />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={post.title} />
<meta name="twitter:description" content={post.excerpt} />
<meta name="twitter:image" content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()} />

<meta property="og:type" content="article" />
<meta property="og:title" content={post.title} />
<meta property="og:description" content={post.excerpt} />
<meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.category.slug}/${post.slug}`} />
<meta property="og:image" content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()} />



    </Head>
  )
}
