import '../tailwind.css'

import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'


export interface SharedPageProps {
  previewMode: boolean
  previewPerspective: string | null
  token: string
}

const PreviewProvider = dynamic(() => import('components/PreviewProvider'))

const SessionProvider = dynamic(
  () => import('next-auth/react').then((m) => m.SessionProvider),
  { ssr: false }
)

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { previewMode, previewPerspective, token } = pageProps
  return (
    <SessionProvider session={(pageProps as any).session}>
      {previewMode ? (<>
        <PreviewProvider perspective={previewPerspective} token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
         <VisualEditing />
         </>
      ) : (
        <Component {...pageProps} />
      )}
      {previewMode && <VisualEditing />}
    </SessionProvider>
  )
}