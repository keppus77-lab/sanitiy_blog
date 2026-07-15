import { useEffect } from 'react'

export function BlogArticle({ children }: { children: React.ReactNode }) {
    useEffect(() => {
    // Automatisch IDs zu Überschriften hinzufügen
        const headings = document.querySelectorAll('article h2, article h3')
    
        headings.forEach((heading) => {
            if (!heading.id) {
            // Slug aus Text generieren
            const text = heading.textContent || ''
            const slug = text
                .toLowerCase()
                .replace(/ä/g, 'ae')
                .replace(/ö/g, 'oe')
                .replace(/ü/g, 'ue')
                .replace(/ß/g, 'ss')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')
            
            heading.id = slug
            }
        })
        }, [children])

    return (
    <article className="prose prose-lg max-w-none">
        {children}
    </article>
    )
}