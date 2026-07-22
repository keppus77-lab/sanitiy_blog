    import React, { useState } from 'react';

    import BlogHeaderNavi from './BlogHeaderNavi'

    export default function WaldarbeitBlog() {
    const [activeCategory, setActiveCategory] = useState('alle');

    const categories = [
        { id: 'alle', label: 'Alle Beiträge' },
        { id: 'technik', label: 'Technik & Maschinen' },
        { id: 'nachhaltigkeit', label: 'Nachhaltigkeit' },
        { id: 'sicherheit', label: 'Arbeitssicherheit' },
        { id: 'praxis', label: 'Praxistipps' }
    ];

    const blogPosts = [
        {
        id: 1,
        category: 'technik',
        title: 'Moderne Harvester-Technologie im Einsatz',
        excerpt: 'Wie digitale Steuerungssysteme die Holzernte revolutionieren und gleichzeitig den Wald schonen.',
        author: 'Martin Keppler',
        date: '10. Juli 2026',
        readTime: '8 Min.',
        image: '🌲',
        tags: ['Harvester', 'Digitalisierung', 'Effizienz']
        },
        {
        id: 2,
        category: 'nachhaltigkeit',
        title: 'Zertifizierte Forstwirtschaft: PEFC vs. FSC',
        excerpt: 'Ein detaillierter Vergleich der beiden wichtigsten Nachhaltigkeitssiegel in der deutschen Forstwirtschaft.',
        author: 'Sandra Müller',
        date: '8. Juli 2026',
        readTime: '6 Min.',
        image: '🌳',
        tags: ['Zertifizierung', 'Standards', 'Umwelt']
        },
        {
        id: 3,
        category: 'sicherheit',
        title: 'Persönliche Schutzausrüstung (PSA) richtig pflegen',
        excerpt: 'Warum die regelmäßige Wartung deiner Schnittschutzhose und Forsthelm Leben retten kann.',
        author: 'Thomas Berg',
        date: '5. Juli 2026',
        readTime: '5 Min.',
        image: '🪓',
        tags: ['PSA', 'Sicherheit', 'Wartung']
        },
        {
        id: 4,
        category: 'praxis',
        title: 'Holzrücken mit dem Forwarder: Best Practices',
        excerpt: 'Praktische Tipps zur Optimierung der Rückegassen und Minimierung von Bodenschäden.',
        author: 'Klaus Weber',
        date: '3. Juli 2026',
        readTime: '10 Min.',
        image: '🚜',
        tags: ['Forwarder', 'Bodenschutz', 'Logistik']
        },
        {
        id: 5,
        category: 'technik',
        title: 'GPS-gestützte Waldinventur mit Drohnen',
        excerpt: 'Wie UAV-Technologie die Bestandsaufnahme präziser und effizienter macht.',
        author: 'Anna Schmidt',
        date: '1. Juli 2026',
        readTime: '7 Min.',
        image: '🛸',
        tags: ['Drohnen', 'GPS', 'Innovation']
        },
        {
        id: 6,
        category: 'nachhaltigkeit',
        title: 'Biodiversität im Wirtschaftswald fördern',
        excerpt: 'Strategien zur Erhaltung der Artenvielfalt bei gleichzeitiger wirtschaftlicher Nutzung.',
        author: 'Dr. Eva Fischer',
        date: '28. Juni 2026',
        readTime: '9 Min.',
        image: '🦌',
        tags: ['Biodiversität', 'Artenschutz', 'Management']
        }
    ];

    const filteredPosts = activeCategory === 'alle' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === activeCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        {/* Header/Navigation */}
        


        {/* Hero Section */}
       

        {/* Category Filter */}
        <section className="bg-white border-b border-gray-200 sticky top-[73px] z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3 py-4 overflow-x-auto scrollbar-hide">
                {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                        ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {cat.label}
                </button>
                ))}
            </div>
            </div>
        </section>

        {/* Blog Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
                <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-7xl">
                    {post.image}
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {categories.find(c => c.id === post.category)?.label}
                    </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-green-700 cursor-pointer transition-colors">
                    {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        #{tag}
                        </span>
                    ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                    </div>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                </div>
                </article>
            ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all hover:shadow-lg">
                Weitere Artikel laden
            </button>
            </div>
        </main>

        {/* Newsletter Section */}
        <section className="bg-gradient-to-r from-green-800 to-emerald-800 text-white py-16 mt-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Bleib auf dem Laufenden
            </h2>
            <p className="text-green-100 text-lg mb-8">
                Erhalte die neuesten Artikel und Expertentipps direkt in dein Postfach.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                type="email"
                placeholder="deine@email.de"
                className="flex-1 px-5 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all hover:shadow-lg">
                Abonnieren
                </button>
            </div>
            <p className="text-xs text-green-200 mt-4">
                Kein Spam. Jederzeit abmeldbar.
            </p>
            </div>
        </section>

        {/* Footer */}
        
        </div>
    );
    }