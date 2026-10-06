import AuthorAvatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

export default function CategoryPager(
    props: {
    actpage: number
    totalPages: number
    categorySlug: string
    } 
) {
    const { actpage, totalPages, categorySlug } = props
    return (




        <div className="bg-emerald-50 dark:bg-slate-700 ">
         <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  pb-10'>
      
      
      
    <nav className="flex items-center justify-between">
            <Link
            className={`rounded-md border px-3 py-2 text-sm ${actpage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
            href={`/blog/${categorySlug}?page=${actpage - 1}`}
            >
            Zurück
            </Link>

            <span className="text-sm text-zinc-600 dark:text-gray-100">
            Seite {actpage} von {totalPages}
            </span>

            <Link
            className={`rounded-md border px-3 py-2 text-sm ${actpage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
            href={`/blog/${categorySlug}?page=${actpage + 1}`}
            >
            Weiter
            </Link>
        </nav>
    </section>
    </div>
    )
}
