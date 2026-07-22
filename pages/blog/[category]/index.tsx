import Link from 'next/link'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getCategoryPage } from '../../../lib/sanity.queries'
import  MoreStories  from '../../../components/MoreStories'
import CategoryPager from '../../../components/CategoryPager'

const PAGE_SIZE = 10

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const categorySlug = ctx.params?.category as string | undefined
    if (!categorySlug) return { notFound: true }

    const pageRaw = Array.isArray(ctx.query.page) ? ctx.query.page[0] : ctx.query.page
    const page = Math.max(1, parseInt(pageRaw || '1', 10) || 1)

    const data = await getCategoryPage(categorySlug, page, PAGE_SIZE)
    if (!data?.category) return { notFound: true }

    const totalPages = Math.max(1, Math.ceil((data.total || 0) / PAGE_SIZE))

    // wenn page zu groß -> 404 oder redirect auf letzte Seite
    if (page > totalPages) {
        return {
            redirect: {
                destination: `blog/${categorySlug}?page=${totalPages}`,
                permanent: false,
            },
        }
    } 

    return {
        props: {
        category: data.category,
        posts: data.posts ?? [],
        total: data.total ?? 0,
        page,
        totalPages,
        categorySlug
        
        },
    }
}

export default function CategoryPage(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    
    const { category, posts, page, totalPages, categorySlug } = props

    return (
        <>
      

        
            
            <MoreStories posts={posts} title={category.title}   />
        
        

        {/* Pager */}
        <CategoryPager actpage={page} totalPages={totalPages} categorySlug={categorySlug} />
      </>
    )
}