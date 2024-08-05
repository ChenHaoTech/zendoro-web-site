import Footer from './footer'
import Header from './header'
import Meta from './meta'
import { GoogleAnalytics } from '@next/third-parties/google'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Meta />
      <Header />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-TLD2XHD410" />
    </html>
  )
}

export default Layout
