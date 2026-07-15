import PostPreview from 'components/PostPreview'
import type { Post } from 'lib/sanity.queries'

export default function MoreStories({ posts, title, description }: { posts: Post[]; title?: string; description?: string }) {
  return (
    <section>
      
      {description || <p className="mb-16 text-lg leading-relaxed text-zinc-600"></p>}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
        {posts.map((post) => (
          <PostPreview
            postData={post}           
          />
        ))}
      </div>
</section>
    </section>
  )
}
