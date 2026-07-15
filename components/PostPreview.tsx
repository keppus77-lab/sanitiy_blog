import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'
import post from 'schemas/post'

export default function PostPreview(prpos: { postData: Post }) {
  const { postData } = prpos
  return (
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
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    {/*     {postData.categories.find(c => c.id === postData.category)?.label} */}
                    </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-green-700 cursor-pointer transition-colors">
                    {postData.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                    {postData.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                    {/*                    {postData.categories.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        #{tag}
                        </span>
                    ))} */}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {/*    {postData.author.split(' ').map(n => n[0]).join('')} */}
                        </div>
                        <div>
                        {/* <p className="text-sm font-medium text-gray-900">{postData.author}</p>*/}
                        <p className="text-xs text-gray-500">{postData.date}</p>
                        </div>
                    </div>
                   {/* <span className="text-sm text-gray-500">{postData.readTime}</span>*/}
                    </div>
                </div>
                </article>
  )
}