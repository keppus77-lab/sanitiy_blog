import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

interface CoverImageProps {
    title: string
    slug?: string
    image: any
    priority?: boolean
}

export default function HeroImage(props: CoverImageProps) {
    const { title, slug, image: source, priority } = props
    

    
    const image = source?.asset?._ref ? (
        
        <Image
            className="h-auto w-full object-cover"
            width={1000}
            height={1000}
            alt={ title }
            src={urlForImage(source).height(1000).width(1000).url()}
            sizes="100vw"
            priority={true}
        /> 
    ): (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

    return (
      <>{ image }</>
    )
}
