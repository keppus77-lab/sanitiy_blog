import React, { useState } from 'react';


export default function BlogPostHero() {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        {/* Header/Navigation */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-green-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    W
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Waldarbeit.Blog</h1>
                    <p className="text-xs text-gray-600">Professionell & Nachhaltig</p>
                </div>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                <a href="#" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Start</a>
                <a href="#" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Über uns</a>
                <a href="#" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Kontakt</a>
                <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all hover:shadow-lg font-medium">
                    Newsletter
                </button>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </button>
            </div>
            </div>
        </header>

        {/* Post Hero Section */}
        <article className="relative">
            {/* Breadcrumb */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                <a href="#" className="hover:text-green-700 transition-colors">Home</a>
                <span>/</span>
                <a href="#" className="hover:text-green-700 transition-colors">Blog</a>
                <span>/</span>
                <a href="#" className="hover:text-green-700 transition-colors">Technik & Maschinen</a>
                <span>/</span>
                <span className="text-gray-900 font-medium">Aktueller Artikel</span>
            </nav>
            </div>

            {/* Hero Content Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {/* Category Badge */}
            <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-green-600/30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Technik & Maschinen
                </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Moderne Harvester-Technologie im Einsatz
            </h1>

            {/* Subtitle/Lead */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
                Wie digitale Steuerungssysteme die Holzernte revolutionieren und gleichzeitig 
                den Wald schonen – ein Blick in die Zukunft der Forstwirtschaft.
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                {/* Author */}
                <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                    MK
                </div>
                <div>
                    <p className="font-semibold text-gray-900">Martin Keppler</p>
                    <p className="text-sm text-gray-600">Forstexperte & Autor</p>
                </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-12 bg-gray-300"></div>

                {/* Date & Reading Time */}
                <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">10. Juli 2026</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">8 Minuten Lesezeit</span>
                </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-12 bg-gray-300"></div>

                {/* Stats */}
                <div className="flex gap-6">
                <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-sm font-medium">2.4k Aufrufe</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm font-medium">34 Kommentare</span>
                </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
                <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all hover:scale-105 ${
                    isBookmarked
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-green-600'
                }`}
                >
                <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {isBookmarked ? 'Gespeichert' : 'Speichern'}
                </button>

                <button className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-green-600 transition-all hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Teilen
                </button>

                <button className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-green-600 transition-all hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Drucken
                </button>
            </div>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-10 group">
                <div className="aspect-video bg-gradient-to-br from-green-700 via-emerald-600 to-green-800 flex items-center justify-center relative">
                {/* Image Placeholder with Forest Scene */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                    <div className="text-9xl mb-4">🌲</div>
                    <p className="text-white text-2xl font-bold">Moderne Harvester-Technologie</p>
                    </div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Image Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm">
                    📸 Harvester im Einsatz – Präzise Holzernte mit modernster Technik | Foto: Martin Keppler
                </p>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">#Harvester</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">#Digitalisierung</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">#Effizienz</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">#Nachhaltigkeit</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">#Forsttechnik</span>
            </div>

            {/* Table of Contents */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-10">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Inhaltsverzeichnis
                </h2>
                <ol className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                    <span className="font-semibold text-green-600 mt-0.5">1.</span>
                    <a href="#" className="hover:text-green-700 transition-colors">Was ist ein Harvester und wie funktioniert er?</a>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-semibold text-green-600 mt-0.5">2.</span>
                    <a href="#" className="hover:text-green-700 transition-colors">Digitale Steuerungssysteme im Detail</a>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-semibold text-green-600 mt-0.5">3.</span>
                    <a href="#" className="hover:text-green-700 transition-colors">Vorteile für Umwelt und Effizienz</a>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-semibold text-green-600 mt-0.5">4.</span>
                    <a href="#" className="hover:text-green-700 transition-colors">Praxisbeispiele aus deutschen Wäldern</a>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-semibold text-green-600 mt-0.5">5.</span>
                    <a href="#" className="hover:text-green-700 transition-colors">Zukunftsperspektiven und Innovationen</a>
                </li>
                </ol>
            </div>

            {/* Article Preview/Intro */}
            <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Die moderne Forstwirtschaft steht vor der Herausforderung, Effizienz und Nachhaltigkeit 
                miteinander zu vereinen. <strong>Harvester mit digitalen Steuerungssystemen</strong> bieten 
                hier eine zukunftsweisende Lösung, die nicht nur die Produktivität steigert, sondern auch 
                aktiv zum Waldschutz beiträgt.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In diesem ausführlichen Artikel erfährst du, wie GPS-gesteuerte Präzision, automatische 
                Qualitätsmessung und intelligente Routenplanung die Holzernte revolutionieren – und warum 
                diese Technologie gerade für mittelständische Forstbetriebe interessant ist.
                </p>
            </div>

            {/* Continue Reading Divider */}
            <div className="flex items-center gap-4 my-12">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
                <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">Artikel lesen</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
            </div>

            {/* Placeholder for Article Content */}
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-600 text-lg mb-2">Hier folgt der Hauptinhalt des Artikels</p>
                <p className="text-gray-500 text-sm">Dieser Hero-Bereich kann mit dem vollständigen Artikel-Content kombiniert werden</p>
            </div>
            </div>
        </article>
        </div>
    );
    }