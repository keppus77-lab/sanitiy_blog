import Link from 'next/link'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getCategoryPage } from '../../lib/sanity.queries'
import  MoreStories  from '../../components/MoreStories'

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
        destination: `/${categorySlug}?page=${totalPages}`,
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
      categorySlug,
    },
  }
}

export default function CategoryPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { category, posts, page, totalPages, categorySlug } = props

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold"></h1>
        {category.description && (
          <p className="mt-2 text-zinc-600">{category.description}</p>
        )}
      </header>

      
         
         <MoreStories posts={posts} title={category.title} description={ category.description } />
       
      

      {/* Pager */}
      <nav className="mt-10 flex items-center justify-between">
        <Link
          className={`rounded-md border px-3 py-2 text-sm ${page <= 1 ? 'pointer-events-none opacity-50' : ''}`}
          href={`/${categorySlug}?page=${page - 1}`}
        >
          Zurück
        </Link>

        <span className="text-sm text-zinc-600">
          Seite {page} von {totalPages}
        </span>

        <Link
          className={`rounded-md border px-3 py-2 text-sm ${page >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
          href={`/${categorySlug}?page=${page + 1}`}
        >
          Weiter
        </Link>
      </nav>
    </div>
  )
}