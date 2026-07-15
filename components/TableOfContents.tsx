import { useState, useEffect } from 'react'
import Link from 'next/link'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string | React.ReactNode
  className?: string
}

export function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])

  useEffect(() => {
    // Alle H2 und H3 Überschriften finden
    const headings = document.querySelectorAll('article h2, article h3')
    
    const tocItems: TocItem[] = Array.from(headings).map((heading, index) => {
      // ID generieren wenn keine vorhanden
      if (!heading.id) {
        heading.id = `heading-${index}`
      }
      
      return {
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.substring(1)) // H2 -> 2, H3 -> 3
      }
    })
    
    setToc(tocItems)
  }, [content])

  if (toc.length === 0) return null

  return (
    <nav className={`bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 ${className}`}>
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Inhaltsverzeichnis
      </h2>
      
      <ol className="space-y-2 text-gray-700">
        {toc.map((item, index) => (
          <li 
            key={item.id}
            className={`flex items-start gap-2 ${item.level === 3 ? 'ml-6' : ''}`}
          >
            <span className="font-semibold text-green-600 mt-0.5">
              {index + 1}.
            </span>
            <a 
              href={`#${item.id}`}
              className="hover:text-green-700 transition-colors hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}