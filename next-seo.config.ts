import { DefaultSeoProps } from "next-seo";

const description = "Tired of manually transferring notes to Obsidian? Use Fleeting Notes to effortlessly capture your ideas and sync them with Obsidian."
// See https://www.npmjs.com/package/next-seo for more options
const config: DefaultSeoProps = {
  titleTemplate: "%s | Fleeting Notes",
  defaultTitle: "Fleeting Notes | A scratchpad that syncs with Obsidian",
  canonical: 'https://www.fleetingnotes.app/',
  description,
  
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    title: 'Fleeting Notes',
    description,
    url: 'https://www.fleetingnotes.app/',
    images: [{
      url: 'https://www.fleetingnotes.app/favicon/og-image.png',
      width: 1200,
      height: 787,
      alt: 'Og Image Alt',
    }]
  },
  twitter: {
    site: '@fleetingnotes_',
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