import { Head, Html, Main, NextScript } from 'next/document'
import Providers from '../app/providers'


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-black">
     
          <Main />
          <NextScript />
        
      </body>
    </Html>
  )
}
