    'use client'

    import { useState } from 'react'
    import { 
    FaFacebookF, 
    FaTwitter, 
    FaLinkedinIn, 
    FaWhatsapp,
    FaEnvelope,
    FaLink,
    FaCheck,
    FaShareAlt
    } from 'react-icons/fa'

    interface ShareButtonProps {
    url?: string
    title?: string
    description?: string,
    className?: string
    }

    export default function SocialShareBar({ 
    url = typeof window !== 'undefined' ? window.location.href : '',
    title = 'Schau dir das an!',
    description = '',
    className =''
    }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    const encodedDescription = encodeURIComponent(description)

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    }

    const handleShare = (platform: string) => {
        window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400')
    }

    const copyToClipboard = async () => {
        try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        } catch (err) {
        console.error('Failed to copy:', err)
        }
    }

    const handleNativeShare = async () => {
        if (navigator.share) {
        try {
            await navigator.share({
            title,
            text: description,
            url,
            })
        } catch (err) {
            console.log('Share cancelled')
        }
        } else {
        setIsOpen(!isOpen)
        }
    }

    return (
        <div className="relative inline-block">
        {/* Trigger Button */}
        <button
            onClick={handleNativeShare}
            className={className}
            
            
        >
            <FaShareAlt  className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Teilen</span>
        </button>

        {/* Share Options */}
        {isOpen && (
            <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)}
            />
            
            {/* Share Bar */}
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 animate-slideUp">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-3 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    {/* Facebook */}
                    <button
                    onClick={() => handleShare('facebook')}
                    className="group relative p-3 rounded-xl bg-[#1877F2] hover:bg-[#0d65d9] text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="Auf Facebook teilen"
                    >
                    <FaFacebookF className="w-5 h-5" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Facebook
                    </span>
                    </button>

                    {/* Twitter/X */}
                    <button
                    onClick={() => handleShare('twitter')}
                    className="group relative p-3 rounded-xl bg-black hover:bg-gray-800 text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="Auf X teilen"
                    >
                    <FaTwitter className="w-5 h-5" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        X (Twitter)
                    </span>
                    </button>

                    {/* LinkedIn */}
                    <button
                    onClick={() => handleShare('linkedin')}
                    className="group relative p-3 rounded-xl bg-[#0A66C2] hover:bg-[#084d8f] text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="Auf LinkedIn teilen"
                    >
                    <FaLinkedinIn className="w-5 h-5" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        LinkedIn
                    </span>
                    </button>

                    {/* WhatsApp */}
                    <button
                    onClick={() => handleShare('whatsapp')}
                    className="group relative p-3 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="Via WhatsApp teilen"
                    >
                    <FaWhatsapp className="w-5 h-5" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        WhatsApp
                    </span>
                    </button>

                    {/* Email */}
                    <button
                    onClick={() => handleShare('email')}
                    className="group relative p-3 rounded-xl bg-gray-600 hover:bg-gray-700 text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="Per E-Mail teilen"
                    >
                    <FaEnvelope className="w-5 h-5" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        E-Mail
                    </span>
                    </button>

                    {/* Divider */}
                    <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />

                    {/* Copy Link */}
                    <button
                    onClick={copyToClipboard}
                    className="group relative p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="Link kopieren"
                    >
                    {copied ? (
                        <FaCheck className="w-5 h-5" />
                    ) : (
                        <FaLink className="w-5 h-5" />
                    )}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {copied ? 'Kopiert!' : 'Link kopieren'}
                    </span>
                    </button>
                </div>
                </div>
                
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                <div className="w-3 h-3 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 rotate-45" />
                </div>
            </div>
            </>
        )}
        </div>
    )
}