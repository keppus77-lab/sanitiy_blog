import { urlForImage } from "lib/sanity.image";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, JSX } from "react";
import { FaYoutube,FaFacebookF,FaXTwitter,FaXing,FaLinkedinIn,FaInstagram,FaTiktok} from "react-icons/fa6";

const socialIcons: Record<string,  { icon: JSX.Element;  color: string;  }> = {
    youtube: { icon: <FaYoutube className="text-xl h-6 w-6" />,  color: "bg-red-600",  },
    facebook: { icon: <FaFacebookF className="text-xl h-6 w-6" />,  color: "bg-blue-600",  },
    x: {  icon: <FaXTwitter className="text-xl h-6 w-6" />,  color: "bg-black",  },
    xing: {  icon: <FaXing className="text-xl h-6 w-6" />,  color: "bg-green-600",  },
    linkedin: {  icon: <FaLinkedinIn className="text-xl h-6 w-6" />,  color: "bg-[#0A66C2]",  },
    instagram: {  icon: <FaInstagram className="text-xl h-6 w-6" />,  color: "bg-pink-500",  },
    tiktok: {  icon: <FaTiktok className="text-xl h-6 w-6" />,  color: "bg-cyan-500",  },
};


export default function Footer({ settings }: any)  {



   
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
                <h3 className="text-white font-semibold mb-4">Folge mir</h3>
                <div className="flex gap-3">
                    {settings?.socialLinks?.map((link: { _key: string; platform: string;  url: string}, index: any) => {
                        const Icon = socialIcons[link.platform.toLowerCase()].icon;
                        const Color = socialIcons[link.platform.toLowerCase()].color;
                     return(
                       <a
                        key={link._key}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.platform}
                        className={`group  flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 ${Color} text-white shadow-lg transition-all duration-300 hover:border-green-500 hover:text-green-500 hover:shadow-green-500/20  hover:scale-110`}
                        >          
                            {Icon}
                        </a>
                    )
                    })}

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