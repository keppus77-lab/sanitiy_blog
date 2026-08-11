import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

interface CoverImageProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
  postid?: string
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority, postid} = props
  const image = source?.asset?._ref ? (
    <div
      className={cn('shadow-small', {
        'transition-shadow duration-200 hover:shadow-medium': slug,
      })}
    >
      <img
        className="teaserImage h-auto w-full" 
        width={2000}
        height={1000}
        alt=""
        src={urlForImage(source).height(1000).width(2000).url()}
        sizes="100vw"
              
    style={{
      viewTransitionName: `article_${props.postid.replaceAll("-", "_")}`
    }}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <>
      {slug ? (
        <a href={slug} aria-label={title}>
          {image}
        </a>
      ) : (
        image
      )}
    </>
  )
}
