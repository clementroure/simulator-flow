// next-seo.config.js
import { siteConfig } from "@/config/site";

export default {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: 'YOUR_WEBSITE_URL', // Replace with your website URL
    site_name: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    // Add your open graph images here
    // images: [{ url: 'IMAGE_URL', width: 800, height: 600, alt: 'Image Alt' }],
  },
  twitter: {
    handle: '@a7med3bdulbaset',
    site: '@a7med3bdulbaset',
    cardType: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    // Add your Twitter image here
    // image: 'IMAGE_URL',
  },
  additionalLinkTags: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '76x76' },
    { rel: 'manifest', href: '/manifest.json' },
  ],
  additionalMetaTags: [
    {
      name: 'theme-color',
      content: 'THEME_COLOR', // Replace with your theme color
    },
  ],
};
