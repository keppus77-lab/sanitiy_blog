import Link from 'next/link'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getTagPage } from '../../../lib/sanity.queries'
import  MoreStories  from '../../../components/MoreStories'
import CategoryPager from '../../../components/CategoryPager'

const PAGE_SIZE = 10

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const tagSlug = ctx.params?.tag as string | undefined

    if (!tagSlug) return { notFound: true }

    const pageRaw = Array.isArray(ctx.query.page) ? ctx.query.page[0] : ctx.query.page
    const page = Math.max(1, parseInt(pageRaw || '1', 10) || 1)
 
    const data = await getTagPage(tagSlug, page, PAGE_SIZE)

    
    if (!data?.tag) return { notFound: true }

    const totalPages = Math.max(1, Math.ceil((data.total || 0) / PAGE_SIZE))

    if (page > totalPages) {
        return {
            redirect: {
                destination: `/tag/${data?.tags.slug}?page=${totalPages}`,
                permanent: false,
            },
        }
    } 

    return {
        props: {
            tags: data.tag,  // ← Jetzt mit title, slug, description
            posts: data.posts ?? [],
            total: data.total ?? 0,
            page,
            totalPages,
            tagSlug
        },
    }
}


export default function TagPage(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const { tags, posts, page, totalPages, tagSlug } = props

    return (
        <>
        <MoreStories posts={posts} title={`# ${tags.title}`} />
            <CategoryPager actpage={page} totalPages={totalPages} categorySlug={tagSlug}  />
        </>
    )
}