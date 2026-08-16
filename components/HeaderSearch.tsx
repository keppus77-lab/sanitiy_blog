
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { FaTimes, FaSearch } from "react-icons/fa";

type Category = {
    title: string
    slug: string
}

type SearchResult = {
    _id: string
    title: string
    excerpt?: string
    slug: string
    category: Category
}

export default function HeaderSearch() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(async () => {
        if (query.trim().length < 2) {
            setResults([])
            return
        }

        setLoading(true)

        try {
            const response = await fetch(
            `/api/search?q=${encodeURIComponent(query)}`
            )

            const data = await response.json()

            setResults(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
        }, 300)

        return () => clearTimeout(timeout)
    }, [query])

    return (
        <div>
        <div className="relative flex items-center">
        
            <div
                className={`
                    flex items-center overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${open ? "w-55 sm:w-70 opacity-100" : "w-0 opacity-0"}
                `}
            >
                <input
                    type="text"
                    placeholder="Suchen..."
                    onChange={(e) => setQuery(e.target.value)}
                    className="
                        w-full rounded-full border border-gray-300
                        bg-white px-4 py-2 pr-10
                        text-sm outline-none
                        focus:border-blue-500
                    "
                />
        

                <button
                    onClick={() => setOpen(false)}
                    className="absolute right-3 text-gray-400 hover:text-gray-700"
                    >
                <FaTimes size={18} />
            </button>
    </div>


    {!open && (
        <button
        onClick={() => setOpen(true)}
        className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            text-gray-700
            transition-colors
            hover:bg-gray-100
        "
        aria-label="Suche öffnen"
        >
        <FaSearch size={20} />
        </button>
    )}
    </div>
    {results.length > 0 && (
            <div className="text-sm text-gray-500d ropdown-menu absolute  mt-2 bg-white shadow-lg rounded-lg p-4 min-w-55 border border-gray-100">
            {results.map((item) => (
                <a     href={`/blog/${item.category.slug}/${item.slug}`}
                key={item._id}
                className="font-semibold">
                    <h3> {item.title} </h3>
                    {item.excerpt && (
                        <p className="mt-1 text-sm text-gray-600">
                        {item.excerpt}
                        </p>
                    )}
                </a>
            ))}
            </div>
        )}
   

        {loading && (<div className="text-sm text-gray-500d ropdown-menu absolute  mt-2 bg-white shadow-lg rounded-lg p-4 min-w-55 border border-gray-100">
            Suche läuft...
            </div>)}
    </div>
    
  );
}