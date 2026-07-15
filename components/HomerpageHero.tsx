    
import React, { useState, useEffect, useRef } from 'react';
import HeroImage from './HeroImage';
import Avatar from './AuthorAvatar';
import Link from 'next/link';

export default function HomepageHero(props) {
console.log('HomepageHero props:', props);
    const { title, category, subtitle, coverImage, date, author, slug, excerpt, emoji } = props
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        {/* Header/Navigation */}
        

        {/* Hero Slider Section */}
        <section className="relative overflow-hidden">
            {/* Main Hero Container */}
            <div className={`relative bg-gradient-to-r from-teal-700 via-cyan-600 to-teal-800 transition-all duration-700`}>
            {/* Animated Background Patterns */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-white">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
                    <span className={`w-2 h-2 bg-cyan-400 rounded-full animate-pulse`}></span>
                    <span className="text-sm font-medium">Willkommen beim Waldarbeit.Blog</span>
                    </div>

                    {/* Main Headline - Animated */}
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
                    {title}
                    </h2>

                    {/* Subtitle */}
                    <p className={`text-2xl md:text-3xl mb-4 font-semibold text-cyan-200 animate-slide-up`} style={{ animationDelay: '0.1s' }}>
                    {subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {excerpt}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    
                    <Link href={`/${category?.slug}/${slug}`} className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                        <span>Artikel lesen</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>

                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div>
                        <p className="text-3xl md:text-4xl font-bold mb-1">???</p>
                        <p className="text-sm text-white/80">Fachartikel</p>
                    </div>
                    <div className="hidden">
                        <p className="text-3xl md:text-4xl font-bold mb-1">25k+</p>
                        <p className="text-sm text-white/80">Leser</p>
                    </div>
                    <div>
                        <p className="text-3xl md:text-4xl font-bold mb-1">30+</p>
                        <p className="text-sm text-white/80">Jahre Expertise</p>
                    </div>
                    </div>
                </div>

                {/* Right Visual */}
                <div className="relative lg:block hidden">
                    <div className="relative animate-float">
                    {/* Main Icon/Illustration */}
                    <div className="w-full aspect-square bg-white/10 backdrop-blur-lg rounded-3xl border-2 border-white/20 flex items-center justify-center shadow-2xl">
                        <div className="text-[20rem] leading-none transform hover:scale-110 transition-transform duration-500 w-full max-w-4xl mx-auto">
                            <HeroImage
                                    slug={slug}
                                    title={title}
                                    image={coverImage}
                                    priority={false}
                                />
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
                        <span className="text-4xl">{emoji}</span>
                    </div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
                        <span className="text-5xl">
                            {author && <Avatar picture={author.picture} />}
                            
                            </span>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb" fillOpacity="0.3"/>
                <path d="M0 120L60 112.5C120 105 240 90 360 82.5C480 75 600 75 720 78.75C840 82.5 960 90 1080 93.75C1200 97.5 1320 97.5 1380 97.5L1440 97.5V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
                </svg>
            </div>
            </div>
        </section>

        {/* Quick Links Section */}
        <section className="hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Category Cards */}
            {[
                { icon: '🚜', title: 'Technik & Maschinen', count: '145 Artikel', color: 'from-blue-500 to-cyan-500' },
                { icon: '🌳', title: 'Nachhaltigkeit', count: '98 Artikel', color: 'from-green-500 to-emerald-500' },
                { icon: '🦺', title: 'Arbeitssicherheit', count: '76 Artikel', color: 'from-orange-500 to-red-500' },
                { icon: '📚', title: 'Praxistipps', count: '181 Artikel', color: 'from-purple-500 to-pink-500' }
            ].map((category, idx) => (
                <div
                key={idx}
                className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 overflow-hidden"
                >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                    <div className="text-5xl mb-4">{category.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.count}</p>
                    <div className="mt-4 flex items-center gap-2 text-green-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Entdecken</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </section>

        <style jsx>{`
            @keyframes slide-up {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
            }

            @keyframes fade-in {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
            }

            @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
            }

            .animate-slide-up {
            animation: slide-up 0.6s ease-out forwards;
            }

            .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
            }

            .animate-float {
            animation: float 6s ease-in-out infinite;
            }

            .scrollbar-hide::-webkit-scrollbar {
            display: none;
            }

            .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
            }
        `}</style>
        </div>
    );
    }