import AlertBanner from 'components/AlertBanner'
import Footer from './Footer'
import BlogHeaderNavi from './BlogHeaderNavi'
import { getNavi, getAllCategories, getAllTags, getClient} from '../lib/sanity.client'
 const [ nav, cats, tags] = await Promise.all([
    
        getNavi(getClient()),  
    getAllCategories(getClient()),
    getAllTags(getClient()),
    
    ])

export default function BlogLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <AlertBanner preview={preview} loading={loading} />
      <BlogHeaderNavi nav={nav} tags={tags} cats={cats} />
      <main>{children}</main>
      <Footer settings={nav} />
    </div>
  )
}
