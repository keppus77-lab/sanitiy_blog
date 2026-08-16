'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type SearchResult = {
    _id: string
    title: string
    excerpt?: string
    slug: string
    }

    export default function Search() {
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

        <div className="mx-auto max-w-2xl relative">
            <div className="absolute indent-0">
        <input
            type="text"
            placeholder="Suche nach Beiträgen..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border p-3"
        />

        {loading && (
            <p className="mt-4 text-sm text-gray-500">
            Suche läuft...
            </p>
        )}
alert(result)
        {results.length > 0 && (
            <div className="mt-4 space-y-3">
            {results.map((item) => (
                <Link
                href={`/posts/`}
                key={item._id}
                className="font-semibold">
                    <h3> {item.title}</h3>
                    {item.excerpt && (
                        <p className="mt-1 text-sm text-gray-600">
                        {item.excerpt}
                        </p>
                    )}
                </Link>
            ))}
            </div>
        )}

        {!loading &&
            query.length > 1 &&
            results.length === 0 && (
            <p className="mt-4 text-gray-500">
                Keine Treffer gefunden.
            </p>
            )}
        </div>
        </div>
    )
}