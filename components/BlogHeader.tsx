import Link from 'next/link'
import { PortableText } from 'next-sanity'

import styles from './BlogHeader.module.css'

export default function BlogHeader({
  title,
  description,
  level,
  categories = []
}: {
  title: string
  description?: any[]
  level: 1 | 2 | 3  
  categories?: { title: string; slug: string }[] // Neue Prop
}) {
  switch (level) {
    case 1:
      return (
        <header className="mb-10 mt-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between text-pretty">
          <h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
            {title} 
          </h1>
          <h4
            className={`mt-5 text-center text-lg md:pl-8 md:text-left ${styles.portableText}`}
          >
            <PortableText value={description} />
          </h4>
        </header>
      )

    case 2:
      return (
        <header>
          <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter text-pretty">
            <Link href="/" className="hover:underline">
              {title}
            </Link>
          </h2>
        </header>
      )
      case 3:
      return (
        <header>
          <h1 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter text-pretty">
            <Link href="/" className="hover:underline">
              {title}
            </Link>
          </h1>
        <nav className={styles.portableText}>test
           {categories.map(category => (
              <Link 
                key={category.slug}
                href={`/category/${category.slug}`} // Routing prüfen
              >
                <a className={styles.categoryLink}>
                  {category.title}
                </a>
              </Link>
            ))}
        </nav>
        </header>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`,
      )
  }
}
