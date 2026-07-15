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
  level: 1 | 2 | 3 | 4  
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
      case 4:
        return (
          <section className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-800 text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Expertenwissen aus der Praxis</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Moderne Waldarbeit.<br />
                <span className="text-emerald-300">Nachhaltig gedacht.</span>
                </h1>
                <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Entdecke neueste Techniken, bewährte Methoden und Expertenwissen rund um 
                professionelle Forstwirtschaft und nachhaltige Waldbewirtschaftung.
                </p>
                <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-green-800 rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105">
                    Neueste Artikel
                </button>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/30 hover:bg-white/20 transition-all">
                    Kategorien
                </button>
                </div>
            </div>
            </div>
          </section>

        )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`,
      )
  }
}
