
import AuthorAvatar from "./AuthorAvatar";



import { readToken } from 'lib/sanity.api'
import { SiteSetting } from "lib/sanity.queries";

import { urlForImage } from 'lib/sanity.image'





interface HeaderProps {
    nav: SiteSetting
    cats?: any[]
    tags?: any[]

}


    


export default function BlogHeaderNavi({ nav, cats, tags }: HeaderProps)  {

    
    return (
        <>
       
        <header className="bg-white/80 backdrop-blur-lg border-b border-green-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <a href="/" className="flex items-center gap-3">
                <div className="w-15 h-15 rounded-lg flex items-center ">
                    
                
                    
                    <img src={urlForImage(nav.logo).height(96).width(96).fit('crop').url()}  className="rounded-full" alt="waldarbeit Logo" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{nav.siteTitle}</h1>
                    <p className="text-xs text-gray-600">{nav.siteSubtitle}</p>
                </div>
                </a>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">

                
                    {nav.headerLinks.map((link, index) => {
                     // Kein Link bei linkType === 'text'
                        if (link.linkType === 'text') {
                            return (
                                
                                <span key={index} className="text-gray-700 hover:text-green-700 font-medium transition-colors">{link.title}</span>
                                
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
                                <div key={index} className="group relative">
                                        <button className="px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors font-medium flex items-center gap-1">
                                        {link.title}
                                        <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                        </button>
                                        
                                            <div className="dropdown-menu absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-55 border border-gray-100">
                 
                                    
                                        
                            
                                    {cats.map((cat, index) => {
                                        return(
                                                <a key={index} href={'/blog/'+cat.slug} className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
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
                                <div key={index} className="group relative">
                                        <button className="px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors font-medium flex items-center gap-1">
                                        {link.title}
                                        <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                        </button>
                                        
                                            <div className="dropdown-menu absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-55 border border-gray-100">
                                    
                                    
                                        
                            
                                    {tags.map((tag, index) => {
                                        return(
                                                <a key={index} href={'/tag/'+tag.slug} className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
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

            </div>     

            <div className="group">
                <input type="checkbox" className="peer hidden " id="cb-menu"></input>
                <button className="md:hidden p-2 text-gray-700 absolute right-2 top-7.25 hover:bg-gray-100 rounded-md">
                    <label htmlFor="cb-menu" >

                        <svg id="hamburgerIcon" className="w-6 h-6 block group-has-checked:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        
                        <svg id="closeIcon" className="w-6 h-6 hidden  group-has-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </label> 
                </button>
                
           


        
        <nav id="mobileMenu" className="bg-white shadow-md absolute w-full left-0 max-h-0 md:hidden border-t border-gray-200 overflow-hidden opacity-0 transition-all duration-300 peer-checked:max-h-1000 peer-checked:opacity-100">
        <div className="py-4 space-y-1">
          
          
           {nav.headerLinks.map((link, index) => {
                     // Kein Link bei linkType === 'text'
                        if (link.linkType === 'text') {
                            return (
                                
                                <span key={index} className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors font-medium">{link.title}</span>
                                
                            )
                        }

                        // Externe Links
                        if (link.linkType === 'external' || link.linkType === 'home' ) {
                        return (
                            
                            <a
                                href={link.url}
                                key={index}
                                target={link.openInNewTab ? '_blank' : '_self'}
                                rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                                className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors font-medium"
                            >
                                {link.title}
                            </a>
                            
                        )
                        }
                        if (link.linkType === 'category') {
                            return (
                                <div key={index} className="group/cat relative">
                                    <input type="checkbox" className="peer hidden" id="cb-cat"></input>
                                         <button className="w-full">
                                            <label className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors font-medium" htmlFor="cb-cat">{link.title}
                                                <svg className="w-5 h-5 transition-transform group-has-checked/cat:rotate-180" id="tagDropdownIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                                </svg>
                                            </label>
                                        </button>
                                        
                                        <div id="kategorienDropdown" className="pl-4 space-y-1 hidden peer-checked:block">
                                           
                                            {cats.map((cat, index) => {
                                                return(
                                                        <a key={index} href={'/blog/'+cat.slug} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors text-sm">
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
                                <div key={index} className="group/tags relative">
                                    <input type="checkbox" className="peer hidden" id="cb-tags"></input>
                                        
                                        <button className="w-full">
                                            <label className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors font-medium" htmlFor="cb-tags">{link.title}
                                                <svg className="w-5 h-5 transition-transform group-has-checked/tags:rotate-180" id="tagDropdownIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                                </svg>
                                            </label>
                                        </button>
                                        
                                        
                                        <div id="tagDropdown" className="pl-4 space-y-1 hidden peer-checked:block">
                                            
                                        
                            
                                        {tags.map((tag, index) => {
                                            return(
                                                <a key={index} href={'/tag/'+tag.slug} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors text-sm">
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
                    </div>
      </nav>
</div>



            </div>
        </header>
        </>
    )
}