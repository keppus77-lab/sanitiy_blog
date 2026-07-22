import React, { useState } from 'react';
import type { Post } from 'lib/sanity.queries'
import Breadcrumb from './Breadcrumb';
import AuthorAvatar from './AuthorAvatar';
import CoverImage from  './CoverImage';
import {PortableText, type PortableTextReactComponents } from 'next-sanity';
import TableOfContents from './TableOfContents'
import { SanityImage } from './SanityImage'
import Link from 'next/link';
import SocialShareBar from './SocialShareBar'
import { toPlainText } from '@portabletext/toolkit'




const myPortableTextComponents: Partial<PortableTextReactComponents> = {
    types: {
        image: ({ value }) => {
        return <SanityImage {...value} />
        },
    },
}

function countWordsPortableText(content: any[]): number {
    
    const allText = (content ?? [])  
    .flatMap((b) => (b?._type === "block" ? b.children ?? [] : [])) 
        .map((c) => c?.text ?? "")
        .join(" ")
        .trim();
        console.log(allText.split(/\s+/).length);

    if (!allText) return 0;
    return allText.split(/\s+/).length;

}



function calculateReadingTime(text: any): number {
    const wordsPerMinute = 200; // Durchschnittliche Lesegeschwindigkeit

    let words = 0;
    if (Array.isArray(text)) {
        words = countWordsPortableText(text);
    } else if (typeof text === 'string') {
        const all = text.trim();
        words = all ? all.split(/\s+/).filter(Boolean).length : 0;
    }

    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}


export default function BlogDetail(prpos: { postData: Post }) {
    
    const { postData } = prpos

    
    
    
      
    const isStringContent = typeof postData.content === 'string';
    const plainText = isStringContent ? postData.content : toPlainText(postData.content as any);
    const readingTime = calculateReadingTime(isStringContent ? plainText : postData.content);

    const handlePrint = () => {
  window.print()
}

    const [isBookmarked, setIsBookmarked] = useState(false);

    const formatted = new Date(postData.date).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        })
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        {/* Header/Navigation */}
        <Breadcrumb title={postData.title} slug={postData.slug} categorySlug={postData.category.slug} categoryTitle={postData.category.title}></Breadcrumb>

        {/* Post Hero Section */}
        <article className="relative">
            
            {/* Hero Content Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {/* Category Badge */}
            <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-green-600/30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                {postData.subtitle}
                </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                {postData.title}
            </h1>

            {/* Subtitle/Lead */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
                {postData.excerpt}
                
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                {/* Author */}
                <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                    <AuthorAvatar picture={postData.author.picture}  />  
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{postData.author.name}</p>
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
                    <span className="text-sm font-medium">{formatted}</span>
                </div>
                
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
                <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">{readingTime} Minuten Lesezeit</span>
                </div>
                </div>


                {/* Stats */}
                <div className="hidden  gap-6">
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
                className={`hidden
                     items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all hover:scale-105 ${
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

                
                <SocialShareBar className="group flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-green-600 transition-all hover:scale-105"
        url={window.location}
        title={postData.title}
        description={postData.excerpt}
      />

                <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-green-600 transition-all hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Drucken
                </button>
            </div>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-10 group">

                <CoverImage title={postData.title} image={postData.coverImage} priority slug={postData.slug} />
                <div className="hidden aspect-video bg-gradient-to-br from-green-700 via-emerald-600 to-green-800  items-center justify-center relative">
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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/100  to-transparent p-6">
                <p className="text-white text-sm">
                    📸 {postData.coverImage.caption} {(postData.coverImage.imageAuthor)? (<> | Foto: {postData.coverImage.imageAuthor}</>) : null}
                </p>
                </div>
            </div>

            {/* Tags */}
<div className="flex flex-wrap gap-2 mb-8">
             {postData.tags?.map((item, index) => (
          <Link href={`/${item.slug}`}
            key={item.id}
           className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full" >#{item.title}</Link>
        ))}
            
            
            </div>

            {/* Table of Contents */}     

            <TableOfContents content={postData.content} ></TableOfContents>

            {/* Article Preview/Intro */}
            <div className="prose prose-lg max-w-none mt-2">
                <p className="text-lg text-gray-700 leading-relaxed mt-6">
                {postData.excerpt}
                </p>
                
            </div>

            {/* Continue Reading Divider */}
            <div className="flex items-center gap-4 my-12">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
                <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">Artikel lesen</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
            </div>

            {/* Placeholder for Article Content */}
            <div id="content" className="prose prose-lg max-w-none">
              {postData.content && !isStringContent && (
                <PortableText value={postData.content} components={myPortableTextComponents} />
              )}
              {postData.content && isStringContent && (
                <p className="text-gray-700 leading-relaxed">{postData.content}</p>
              )}
            </div>
           
            </div>
        </article>
        </div>
    );
    }