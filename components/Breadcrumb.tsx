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
        <>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: categoryTitle,
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${categorySlug}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${categorySlug}/${slug}`,
        },
      ],
    }),
  }}

/>


    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                
                <Link href="/" className="hover:text-green-700 transition-colors">Home</Link>
                <span>/</span>
                
                <Link href={`/blog/${categorySlug}`} className="hover:text-green-700 transition-colors">{categoryTitle}</Link>
                <span>/</span>
                <div className="hover:text-green-700 transition-colors">{title}</div>
                
            </nav>
    </div>
    </>
    )
}            