import AlertBanner from 'components/AlertBanner'
import Footer from './Footer'
import BlogHeaderNavi from './BlogHeaderNavi'

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
      <BlogHeaderNavi />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
