import Link from "next/link" 

export default function Breadcrumb(props: {
    title: string,
    slug: string,
    categorySlug: string,
    categoryTitle: string
    } 
) {
    const { title, slug, categorySlug, categoryTitle } = props

    return(
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                
                <Link href="/" className="hover:text-green-700 transition-colors">Home</Link>
                <span>/</span>
                
                <Link href={`/${categorySlug}`} className="hover:text-green-700 transition-colors">{categoryTitle}</Link>
                <span>/</span>
                <Link href={slug} className="hover:text-green-700 transition-colors">{title}</Link>
                
            </nav>
    </div>
    )
}            