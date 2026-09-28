import AuthorAvatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import { toPlainText } from '@portabletext/toolkit'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'


function countWordsPortableText(content: any[]): number {
    
    const allText = (content ?? [])  
    .flatMap((b) => (b?._type === "block" ? b.children ?? [] : [])) 
        .map((c) => c?.text ?? "")
        .join(" ")
        .trim();
        

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



export default function PostPreview(prpos: { postData: Post; category: string  }) {
  const { postData } = prpos

  

  const isStringContent = typeof postData.content === 'string';
  const plainText = isStringContent ? postData.content : toPlainText(postData.content as any);
  
  const readingTime = calculateReadingTime(isStringContent ? plainText : postData.content);
  
  const formatted = new Date(postData.date).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        })

        
  return (
    <div className="grid gap-0 card-wrapper">
    
      <article
          key={postData._id}
          className="card bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100
          grid grid-rows-subgrid row-span-6 gap-0
          "
          >
          
          {/* Image Placeholder */}
          <div className="bg-linear-to-br from-green-600 to-emerald-700  text-7xl overflow-hidden">
              <CoverImage title={postData.title} slug={`/blog/${postData.category?.slug}/${postData.slug}`} postid={postData._id.replaceAll("-", "_")} image={postData.coverImage} priority={false}
              />
          </div>

          
              {/* Category Badge */}
              <div className="mb-3 p-4">
                {postData.category?.title &&
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-emerald-950 text-green-700 dark:text-emerald-400 text-xs font-semibold rounded-full">{postData.category.title}</span>}
              
              
              </div>

              {/* Title */}
              <h2 className="px-4 text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight dark:hover:text-emerald-400 cursor-pointer transition-colors">
              <a aria-label={postData.title} href={`/blog/${postData.category?.slug}/${postData.slug}`} >{postData.title}</a>
              </h2>

              {/* Excerpt 
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed h-[75px]">*/}
              
              <p className="p-4 mb-4 leading-relaxed h-75px bg-linear-to-b from-gray-600 via-gray-600 to-gray-600/80   dark:from-gray-100 dark:via-gray-100 dark:to-gray-100/80 text-gradient dark:text-gray-100">

              {postData.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4 px-4">
                
              {postData.tags?.map((item, index) => (
                  <Link href={`/tag/${item.slug}`}
                    key={item.id}
                  className="px-3 py-1 bg-green-100 dark:bg-emerald-950 text-green-700 dark:text-emerald-400 text-sm font-medium rounded-full" >#{item.title}</Link>
                ))}
              </div>

              {/* Meta */}
              <div className="px-4 mb-4 flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-linear-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {postData.author && <AuthorAvatar picture={postData.author.picture} role={postData.author.role} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100"> {postData.author?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatted}</p>
                  </div>
                  </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{readingTime} Min</span>
              </div>
          
      </article>
      
    </div>
  )
}