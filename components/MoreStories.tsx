import PostPreview from 'components/PostPreview'
import type { Post } from 'lib/sanity.queries'



export default function MoreStories({ posts, title, description }: { posts: Post[]; title?: string; description?: string }) {
  
  return (
    <>
    <style>{`

.card-wrapper {
--in-view: false;
animation: article-in-view both;
animation-timeline: view();
animation-range: entry 0% entry 40%;

}

@keyframes article-in-view{
      from{
        --in-view: false;
      }
      to{
        --in-view: true;
      }
}
      
      .portfolio{
      container: portfolio / inline-size;
      }
@container portfolio (width > calc(48rem)){
  .card-wrapper:nth-child(2n){--stagger: 1;}
}

@container portfolio (width > calc(64rem)){
  .card-wrapper:nth-child(3n + 1){--stagger: 1;}
.card-wrapper:nth-child(3n + 2){--stagger: 2;}
.card-wrapper:nth-child(3n + 3){--stagger: 3;}

  }



      .card{
        animation: card-in 1s both paused;
        animation-delay: calc(var(--stagger, 0s) * .2s);

        @container style(--in-view: true){
          animation-play-state: running;          
        }

      }
      @keyframes card-in{
        0% { opacity: 0; translate: 0 60px;}
        100% {opacity: 1; translate: 0 0;}
      }  

`}</style>
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-green-50 to-emerald-50 z-49 relative'>
      
       <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {title && (
            <><h1 className="text-3xl font-semibold">{title}</h1>
            <p className="mt-2 text-zinc-600">{description}</p>
            </>
            )}
        </header>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="portfolio grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
        {posts.map((post) => (
          
          <PostPreview
            key={post._id}
            postData={post} 
            category={post.category?.slug ?? ''}
           
          />
          
        ))}
       </div>

    </section>
    </div>
    </>
  )
}
