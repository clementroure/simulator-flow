if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>i(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-478e35ee"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"f18d5c0073c6bd1c56a04ab3ef9598b8"},{url:"/_next/static/NV101BTUgiHSqTLyt-0wZ/_buildManifest.js",revision:"17869beea4912e0c7af5fdbbdd68504e"},{url:"/_next/static/NV101BTUgiHSqTLyt-0wZ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/106-bd6ce4141882753c.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/198-24ab97534f48da54.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/1f383357-3acf8cc85d473f4d.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/222-59bbbb36cce3b0c9.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/281-9b6b4b70a8cfe7e6.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/4ae7487b-82a44ddc9126b28d.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/551-2016a67738cf63c2.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/681-2288cb4ce0c5ad69.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/854-717bb2f654107c97.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/914-77d1c3c19560a35b.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/989-3e85d701963ab2bd.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/app/error-dcbd0c8e4bdbd205.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/app/layout-e6a31b668478f1ef.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/app/not-found-0bbd99c0571cec89.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/app/page-a1efa0778411bf14.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/framework-8134fd86a8db2e3f.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/main-app-eccdbb70e5eb4922.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/main-d02d0327027b7c58.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/pages/_app-777db899fae5ab67.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/pages/_error-aeccb15722caf068.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/pages/auth/authPage-d57f500ab36ee3c9.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/pages/auth/components/user-auth-form-d506edd8eb11e1a9.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/pages/callback-3738b2a0d2f798b5.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-d8775a2f1919986f.js",revision:"NV101BTUgiHSqTLyt-0wZ"},{url:"/_next/static/css/a8f041d209b37a46.css",revision:"a8f041d209b37a46"},{url:"/_next/static/css/b73dcc845af63f9f.css",revision:"b73dcc845af63f9f"},{url:"/_next/static/media/0f6f2bcea8e14b6d-s.woff2",revision:"50f85f22ada697347d1aaf25d36fc645"},{url:"/_next/static/media/22d15b7c91e54636-s.woff2",revision:"05557bc0ea230dab74c16091af8aa10a"},{url:"/_next/static/media/401c0e3eb245e96e-s.woff2",revision:"19d41f39175dead2179ae499cd0e4cd7"},{url:"/_next/static/media/4c2e5f5947719544-s.p.woff2",revision:"ae342e0b6af96df30af03ef1263f55c8"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icon.ico",revision:"cee21d7b0255a4bb5a7c116c1648e79c"},{url:"/images/auth/auth.jpg",revision:"1f3535e2b893d35337690a572b85ff48"},{url:"/images/fallback.png",revision:"19ec25eae544c866296db7804d03c01f"},{url:"/images/favicon.png",revision:"42552fde50bbff709b65a5763299fcb4"},{url:"/images/icon-192.png",revision:"5b2b8dde4db119b2e434548da1ce94e7"},{url:"/images/icon-512.png",revision:"48392330491c56a2e6834c53eafe1ccb"},{url:"/images/icon-maskable-192.png",revision:"5b2b8dde4db119b2e434548da1ce94e7"},{url:"/images/icon-maskable-512.png",revision:"48392330491c56a2e6834c53eafe1ccb"},{url:"/manifest.json",revision:"0b250e3a09517d6b53bf426cae885e7d"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>self.origin===e.origin&&!(!e.pathname.startsWith("/_next/data/")||-1===e.pathname.indexOf(".json"))),new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{cacheWillUpdate:async({request:e,response:s})=>e.headers.get("x-middleware-prefetch")||s.headers.get("x-middleware-skip")?null:200===s.status?s:null},{cachedResponseWillBeUsed:async({cacheName:e,request:s,matchOptions:i,cachedResponse:n,event:a})=>n&&n.headers.get("x-middleware-skip")?null:n}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/callback/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
