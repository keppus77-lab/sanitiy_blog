import { urlForImage } from "lib/sanity.image";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function Footer({ settings }: any)  {

   console.log(settings) 
return (
    
    
<footer className="bg-gray-900 text-gray-400 py-12 z-49 relative">
    
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                    
                     <img src={urlForImage(settings?.logo).height(50).width(50).fit('crop').url()}  className="rounded-full" alt={settings?.siteTitle+" Logo"}  />
                    
                    <span className="text-white font-bold text-lg">{settings?.siteTitle}</span>
                </div>
                <div className="text-sm leading-relaxed mb-4">
                    {settings?.footerText}
                </div>
                <p className="text-xs">
                    {settings?.copyright}
                </p>
                </div>

                {/* Quick Links */}
                <div>
                <h3 className="text-white font-semibold mb-4">Schnellzugriff</h3>
                <ul className="space-y-2 text-sm">
                    {settings?.footerLinks?.map((link: { _id: Key; openInNewTab: boolean; title: string ; url: string}, index: any) => {
                        return (
                            <li key={index}><a
                            href={link.url}
                                
                                target={link.openInNewTab ? '_blank' : '_self'}
                                rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                                className="hover:text-green-400 transition-colors"
                            >
                                {link.title}
                            </a></li>
                        )

                        })
                    }
                   
                </ul>
                </div>

                {/* Social */}
                <div>
                <h3 className="text-white font-semibold mb-4">Folge uns</h3>
                <div className="flex gap-3">
 


                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                    <span className="text-lg">📱</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                    <span className="text-lg">🐦</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                    <span className="text-lg">📺</span>
                    </a>
                </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center">
                <p className="text-sm">
                {settings?.bottomText}
                </p>
            </div>
            </div>
        </footer>
)
}