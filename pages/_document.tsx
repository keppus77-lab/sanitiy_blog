import { Head, Html, Main, NextScript } from 'next/document'
import BlogHeaderNavi from 'components/BlogHeaderNavi'
import Footer from 'components/Footer'
import Providers from '../app/providers'


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-black">
     <BlogHeaderNavi />
          <Main />
          <NextScript />
        <Footer/>
      </body>
    </Html>
  )
}
