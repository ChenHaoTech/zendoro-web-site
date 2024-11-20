import { DefaultSeoProps } from "next-seo";

const description = "Experience the First Timer That Adapts to Your Natural Rhythm - Keep Your Momentum Going While Taking Breaks When You Really Need Them"
// See https://www.npmjs.com/package/next-seo for more options
const config: DefaultSeoProps = {
  titleTemplate: "%s | Zendoro",
  defaultTitle: "Zendoro - Next Level Pomodoro",
  canonical: 'https://www.zendoro.app/',
  description,
  
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    title: 'Zendoro - Next Level Pomodoro',
    description,
    url: 'https://www.zendoro.app/',
    images: [{
      url: 'https://www.zendoro.app/favicon/og-image.png',
      width: 1200,
      height: 787,
      alt: 'Og Image Alt',
    }]
  },
  twitter: {
    site: '@HaoBuilds',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon/favicon-32x32.png',
      sizes: '32x32'
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon/favicon-16x16.png',
      sizes: '16x16'
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png"
    },
    {
      rel: "shortcut icon",
      type: "image/png",
      href: "/favicon.ico"
    },
    {
      rel: "manifest",
      href: "/favicon/site.webmanifest"
    }
  ]
};

export default config;