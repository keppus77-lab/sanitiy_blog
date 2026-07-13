import { client } from '../../lib/sanity.client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

async function getCategoryPosts(categorySlug: string) {
    return client.fetch(
    `{
      "category": *[_type == "category" && slug.current == $categorySlug][0] {
        title,
        description,
        "slug": slug.current
    },
      "posts": *[_type == "post" && category->slug.current == $categorySlug] | order(date desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        date,
        coverImage
        }
    }`,
        { categorySlug }
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = await client.fetch<{ slug: string }[]>(
    `*[_type == "category" && defined(slug.current)] { "slug": slug.current }`
    )

    return {
    paths: categories.map((c) => ({ params: { category: c.slug } })),
    fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<{
    category: any
    posts: any[]
    categorySlug: string
}> = async (context) => {
    const categorySlug = context.params?.category as string | undefined
    if (!categorySlug) return { notFound: true }

    const data = await getCategoryPosts(categorySlug)
    if (!data?.category) return { notFound: true }

    return {
        props: {
            category: data.category,
            posts: data.posts ?? [],
            categorySlug,
        },
        revalidate: 60,
    }
}

export default function CategoryPage(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    // Fetch category data and its posts
const { category, posts, categorySlug } = props



    
    if (!category) {
        notFound()
    }

    return (
    <div>
        <h1>{category.title}</h1>
        {category.description && <p>{category.description}</p>}
        <div className="posts-grid">
        {posts.map((post) => (
        <Link 
          key={post._id} 
          href={`/${categorySlug}/${post.slug}`}
        >
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </Link>
        ))}
        </div>
    </div>
    ) 
}