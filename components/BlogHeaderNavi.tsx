
import AuthorAvatar from "./AuthorAvatar";

import { getNavi, client, getAllCategories, getAllTags } from "../lib/sanity.client";

import './BlogHeaderNavi.css';
import { NavItem } from "lib/sanity.queries";


    const navi = await getNavi(client); 
    const cats = await  getAllCategories(client);
    const tags = await  getAllTags(client);
    
interface HeaderProps {
    links: NavItem[]
}

export default function BlogHeaderNavi() {
    
    return (
        <header className="bg-white/80 backdrop-blur-lg border-b border-green-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <div className="flex items-center gap-3">
                <div className="w-15 h-15 rounded-lg flex items-center ">
                    <img src="waldarbeit-logo.webp" className="rounded-full" alt="waldarbeit Logo" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Waldarbeit.Blog</h1>
                    <p className="text-xs text-gray-600">Professionell & Nachhaltig</p>
                </div>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">

                
                    {navi.map((link, index) => {
                     // Kein Link bei linkType === 'text'
                        if (link.linkType === 'text') {
                            return (
                                
                                <span className="text-gray-700 hover:text-green-700 font-medium transition-colors">{link.title}</span>
                                
                            )
                        }

                        // Externe Links
                        if (link.linkType === 'external') {
                        return (
                            
                            <a
                                key={index}
                                target={link.openInNewTab ? '_blank' : '_self'}
                                rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                                className="text-gray-700 hover:text-green-700 font-medium transition-colors"
                            >
                                {link.title}
                            </a>
                            
                        )
                        }
                        if (link.linkType === 'category') {
                            return (
                                <div className="group relative">
                                        <button className="px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors font-medium flex items-center gap-1">
                                        {link.title}
                                        <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                        </button>
                                        
                                            <div className="dropdown-menu absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[220px] border border-gray-100">
                 
                                    
                                        
                            
                                    {cats.map((cat, index) => {
                                        return(
                                                <a key={index} href={'test'+cat.slug} className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                                                    {cat.title}
                                                </a>
                                        )
                                    })}
                                </div>
                                </div>

                            )

                        }

                        if (link.linkType === 'tags') {
                            return (
                                <div className="group relative">
                                        <button className="px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors font-medium flex items-center gap-1">
                                        {link.title}
                                        <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                        </button>
                                        
                                            <div className="dropdown-menu absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[220px] border border-gray-100">
                                    
                                    
                                        
                            
                                    {tags.map((tag, index) => {
                                        return(
                                                <a key={index} href={'test'+tag.slug} className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                                                    {tag.title}
                                                </a>
                                        )
                                    })}
                                </div>
                                </div>

                            )

                        }
                        // Interne Links (category, post, page)
                        return (
                            <a
                            key={index}
                            href={link.url}                            
                            className="text-gray-700 hover:text-green-700 font-medium transition-colors"
                            >
                            {link.title}
                            </a>
                        
                        )
                    })}
                        
                        
        
                    
                </nav>

                
                <button className="md:hidden p-2 text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </button>
            </div>
            </div>
        </header>
    )
}