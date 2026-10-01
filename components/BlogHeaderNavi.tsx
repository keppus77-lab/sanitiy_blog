
import AuthorAvatar from "./AuthorAvatar";



import { readToken } from 'lib/sanity.api'
import { SiteSetting } from "lib/sanity.queries";

import { urlForImage } from 'lib/sanity.image'
import Search from "./Search";
import HeaderSearch from "./HeaderSearch" ;
import DarkmodeToggle from "./DarkmodeToggle";
import { useEffect, useState } from "react";





interface HeaderProps {
    nav: SiteSetting
    cats?: any[]
    tags?: any[]

}



export function useHideHeader() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Immer anzeigen, wenn man ganz oben ist
        if (currentScrollY < 160) {
            setVisible(true);
        } else {
            setVisible(currentScrollY < lastScrollY);
        }

        lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, {
        passive: true,
        });

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return visible;
}

export default function BlogHeaderNavi({ nav, cats, tags }: HeaderProps)  {
const [scrolled, setScrolled] = useState(false);

const visible = useHideHeader();

    return (
        <>
       
        <header className={`bg-white/80 dark:bg-slate-950/85 backdrop-blur-lg border-b border-green-100 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-transform duration-300
${visible ? "translate-y-0" : "-translate-y-full"}
`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <a href="/" className="flex items-center gap-3">
                <div className="w-15 h-15 rounded-lg flex items-center ">
                    
                
                    
                    <img src={urlForImage(nav.logo).height(96).width(96).fit('crop').url()}  className="rounded-full" alt="waldarbeit Logo" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{nav.siteTitle}</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{nav.siteSubtitle}</p>
                </div>
                </a>
                

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">

                    <HeaderSearch/>
                    <div><div className="relative flex items-center"><DarkmodeToggle/></div></div>
                    
                    {nav.headerLinks.map((link, index) => {
                     // Kein Link bei linkType === 'text'
                        if (link.linkType === 'text') {
                            return (
                                
                                <span key={index} className="text-gray-700 dark:text-gray-300 dark:hover:text-emerald-400 font-medium transition-colors">{link.title}</span>
                                
                            )
                        }

                        // Externe Links
                        if (link.linkType === 'external') {
                        return (
                            
                            <a
                                key={index}
                                target={link.openInNewTab ? '_blank' : '_self'}
                                rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                                className="text-gray-700 dark:text-gray-300 dark:hover:text-emerald-400 font-medium transition-colors"
                            >
                                {link.title}
                            </a>
                            
                        )
                        }
                        if (link.linkType === 'category') {
                            return (
                                <div key={index} className="group relative">
                                        <button className="px-4 py-2 text-gray-700 dark:text-gray-300 dark:hover:text-emerald-400 dark:hover:bg-slate-800 rounded-md transition-colors font-medium flex items-center gap-1">
                                        {link.title}
                                        <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                        </button>
                                        
                                            <div className="dropdown-menu absolute top-full right-0 mt-2 bg-white dark:bg-slate-600 shadow-lg rounded-lg py-2 min-w-55 border border-gray-100">
                                    
                                        
                            
                                    {cats.map((cat, index) => {
                                        return(
                                                <a key={index} href={'/blog/'+cat.slug} className="block px-4 py-2 text-gray-700 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400 transition-colors">
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
                                        <button className="px-4 py-2 text-gray-700 dark:text-gray-300 dark:hover:text-emerald-400 dark:hover:bg-slate-800 rounded-md transition-colors font-medium flex items-center gap-1">
                                        {link.title}
                                        <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                        </button>
                                        
                                            <div className="dropdown-menu absolute top-full right-0 mt-2 bg-white  dark:bg-slate-600 shadow-lg rounded-lg py-2 min-w-55 border border-gray-100">

                                    {tags.map((tag, index) => {
                                        return(
                                                <a key={index} href={'/tag/'+tag.slug} className="block px-4 py-2 text-gray-700 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400 transition-colors">
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
                            className="text-gray-700 dark:text-gray-300 dark:hover:text-emerald-400 font-medium transition-colors"
                            >
                            {link.title}
                            </a>
                        
                        )
                    })}
                        
        
                    
                </nav>

            </div>     

            <div className="group ">
                
               <div className="absolute  w-full left-0 max-h-0 md:hidden border-t border-gray-200 overflow-hidden opacity-0 transition-all duration-300 peer-checked:max-h-1000 peer-checked:opacity-100"><DarkmodeToggle/></div>    
               
               <div className="md:hidden absolute right-20 top-8 flex items-center"><DarkmodeToggle/></div>
                <input type="checkbox" className="peer hidden " id="cb-menu"></input>
                <button className="absolute right-2 top-7.25 md:hidden p-2 text-gray-700 dark:text-gray-300   hover:bg-gray-100  dark:hover:bg-gray-800 rounded-md">
                    <label htmlFor="cb-menu" >

                        <svg id="hamburgerIcon" className="w-6 h-6 block group-has-checked:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        
                        <svg id="closeIcon" className="w-6 h-6 hidden  group-has-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </label> 
                </button>
                


        


        
        <nav id="mobileMenu" className="bg-white dark:bg-gray-800 shadow-md absolute w-full left-0 max-h-0 md:hidden border-t border-gray-200 overflow-hidden opacity-0 transition-all duration-300 peer-checked:max-h-1000 peer-checked:opacity-100">
            
        <div className="py-4 space-y-1">

            <HeaderSearch mobile="true" />
                    {nav.headerLinks.map((link, index) => {
                     // Kein Link bei linkType === 'text'
                        if (link.linkType === 'text') {
                            return (
                                
                                <span key={index} className="block px-4 py-3 text-gray-700 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400 rounded-md transition-colors font-medium">{link.title}</span>
                                
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
                                className="block px-4 py-3 text-gray-700 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400 rounded-md transition-colors font-medium"
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
                                            <label className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400 rounded-md transition-colors font-medium" htmlFor="cb-cat">{link.title}
                                                <svg className="w-5 h-5 transition-transform group-has-checked/cat:rotate-180" id="tagDropdownIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                                </svg>
                                            </label>
                                        </button>
                                        
                                        <div id="kategorienDropdown" className="pl-4 space-y-1 hidden peer-checked:block">
                                            {cats.map((cat, index) => {
                                                return(
                                                        <a key={index} href={'/blog/'+cat.slug} className="block px-4 py-2 text-gray-600 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400 rounded-md transition-colors text-sm">
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
                                            <label className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400 rounded-md transition-colors font-medium" htmlFor="cb-tags">{link.title}
                                                <svg className="w-5 h-5 transition-transform group-has-checked/tags:rotate-180" id="tagDropdownIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                                </svg>
                                            </label>
                                        </button>
                                        
                                        
                                        <div id="tagDropdown" className="pl-4 space-y-1 hidden peer-checked:block">
                                            
                                        
                            
                                        {tags.map((tag, index) => {
                                            return(
                                                <a key={index} href={'/tag/'+tag.slug} className="block px-4 py-2 text-gray-600 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400 rounded-md transition-colors text-sm">
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
                            className="text-gray-700 dark:text-gray-300 dark:hover:text-emerald-400 font-medium transition-colors"
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