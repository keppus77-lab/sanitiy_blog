import PostPreview from 'components/PostPreview'
import type { Post } from 'lib/sanity.queries'



export default function MoreStories({ posts, title, description }: { posts: Post[]; title?: string; description?: string }) {
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50'>
      
       <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-semibold"></h1>
            {title && (
            <><h1 className="text-3xl font-semibold">{title}</h1>
            <p className="mt-2 text-zinc-600">{description}</p>
            </>
            )}
        </header>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
        {posts.map((post) => (
          <PostPreview
            key={post._id}
            postData={post} 
           
          />
        ))}
      </div>

    </section>
    </div>
  )
}
