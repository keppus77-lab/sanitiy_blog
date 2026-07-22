import AuthorAvatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'

import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

function calculateReadingTime2(text: string): number {
  const wordsPerMinute = 200; // Durchschnittliche Lesegeschwindigkeit
   if (!text || typeof text !== 'string') {
    return 0;
  }
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}



export default function PostPreview(prpos: { postData: Post; category: string  }) {
  const { postData, category, categoryTitle } = prpos
  console.log(prpos

  )
    const isStringContent = typeof postData.content === 'string';
  const readingTime = calculateReadingTime2(isStringContent ?  postData.content : postData.excerpt || '');
  const formatted = new Date(postData.date).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        })
console.log(postData);
  return (
    <>
    
    <article
                key={postData._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-7xl">
                    <CoverImage title={postData.title} slug={postData.slug} image={postData.coverImage} priority={false}
                     />
                                    </div>

                {/* Content */}
                <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                      {postData.category?.title &&
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">{postData.category.title}</span>}
                    
                    
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-green-700 cursor-pointer transition-colors">
                    <Link href={`/blog/${postData.category?.slug}/${postData.slug}`} >{postData.title}</Link>
                    </h2>

                    {/* Excerpt 
                    <p className="text-gray-600 mb-4 leading-relaxed h-[75px]">*/}
                    
                    <p className="mb-4 leading-relaxed h-[75px] bg-gradient-to-b from-gray-600 via-gray-600 to-gray-600/80 text-gradient">

                    {postData.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      
               

                     {postData.tags?.map((item, index) => (
                        <Link href={`/tag/${item.slug}`}
                          key={item.id}
                        className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full" >#{item.title}</Link>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                           {postData.author && <AuthorAvatar picture={postData.author.picture} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900"> {postData.author?.name}</p>
                          <p className="text-xs text-gray-500">{formatted}</p>
                        </div>
                        </div>
                          <span className="text-sm text-gray-500">{readingTime} Min</span>
                    </div>
                </div>
            </article>
          </>
  )
}