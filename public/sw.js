if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let r={};const t=e=>s(e,c),o={module:{uri:c},exports:r,require:t};a[c]=Promise.all(i.map((e=>o[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts("fallback-Mtui38nvcgr37zueoe-lM.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Mtui38nvcgr37zueoe-lM/_buildManifest.js",revision:"d7f8f5cc306d88b869dd43b906ce14d6"},{url:"/_next/static/Mtui38nvcgr37zueoe-lM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/123-75b0c5b2e855b4cf.js",revision:"75b0c5b2e855b4cf"},{url:"/_next/static/chunks/138-e156991360733f34.js",revision:"e156991360733f34"},{url:"/_next/static/chunks/168-eae4352e17fafd74.js",revision:"eae4352e17fafd74"},{url:"/_next/static/chunks/180-7604e8a893105329.js",revision:"7604e8a893105329"},{url:"/_next/static/chunks/189-c077c5cc13446176.js",revision:"c077c5cc13446176"},{url:"/_next/static/chunks/218.8684b11353c98586.js",revision:"8684b11353c98586"},{url:"/_next/static/chunks/281-935e6b30cd79aaaa.js",revision:"935e6b30cd79aaaa"},{url:"/_next/static/chunks/368-b4af80337e167101.js",revision:"b4af80337e167101"},{url:"/_next/static/chunks/388-80421e7a45527bef.js",revision:"80421e7a45527bef"},{url:"/_next/static/chunks/401-527154bab2cdea06.js",revision:"527154bab2cdea06"},{url:"/_next/static/chunks/406-72b3e029da057b98.js",revision:"72b3e029da057b98"},{url:"/_next/static/chunks/507-6b68141383e3ac71.js",revision:"6b68141383e3ac71"},{url:"/_next/static/chunks/554-bdf6e11cef3c4eae.js",revision:"bdf6e11cef3c4eae"},{url:"/_next/static/chunks/562-60f1ef2b09cd7d2a.js",revision:"60f1ef2b09cd7d2a"},{url:"/_next/static/chunks/619.0157f4a782fbfd21.js",revision:"0157f4a782fbfd21"},{url:"/_next/static/chunks/675-57584de5d6e14723.js",revision:"57584de5d6e14723"},{url:"/_next/static/chunks/704.27d120b6cb11cf2a.js",revision:"27d120b6cb11cf2a"},{url:"/_next/static/chunks/772-6bdf83eeeba4b50e.js",revision:"6bdf83eeeba4b50e"},{url:"/_next/static/chunks/781.c85fcd39f1d640ab.js",revision:"c85fcd39f1d640ab"},{url:"/_next/static/chunks/805-fd081ed241cbc37c.js",revision:"fd081ed241cbc37c"},{url:"/_next/static/chunks/847.1243ddef229b826a.js",revision:"1243ddef229b826a"},{url:"/_next/static/chunks/857-6abefc86c7294efb.js",revision:"6abefc86c7294efb"},{url:"/_next/static/chunks/918.70a0ba2b658d3c98.js",revision:"70a0ba2b658d3c98"},{url:"/_next/static/chunks/924.45f458e57d6a00ff.js",revision:"45f458e57d6a00ff"},{url:"/_next/static/chunks/929.a6ae714277745cb9.js",revision:"a6ae714277745cb9"},{url:"/_next/static/chunks/940-7d90e69d208cea47.js",revision:"7d90e69d208cea47"},{url:"/_next/static/chunks/framework-305cb810cde7afac.js",revision:"305cb810cde7afac"},{url:"/_next/static/chunks/main-0297eaf7af55f896.js",revision:"0297eaf7af55f896"},{url:"/_next/static/chunks/pages/_app-c97d893480480c5f.js",revision:"c97d893480480c5f"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/_offline-a2413f43c45287a7.js",revision:"a2413f43c45287a7"},{url:"/_next/static/chunks/pages/about-44ccb4f18f9569b0.js",revision:"44ccb4f18f9569b0"},{url:"/_next/static/chunks/pages/app-22316cf5e5e0fa17.js",revision:"22316cf5e5e0fa17"},{url:"/_next/static/chunks/pages/communities/%5Bid%5D-ce50e092b2da04f7.js",revision:"ce50e092b2da04f7"},{url:"/_next/static/chunks/pages/communities/%5Bid%5D/info-6647dc12a78480ab.js",revision:"6647dc12a78480ab"},{url:"/_next/static/chunks/pages/debug-56196f6e006b8502.js",revision:"56196f6e006b8502"},{url:"/_next/static/chunks/pages/for-you-6b80a2c69bf10e47.js",revision:"6b80a2c69bf10e47"},{url:"/_next/static/chunks/pages/index-df78be341387290e.js",revision:"df78be341387290e"},{url:"/_next/static/chunks/pages/left-panel-061a215fb1ad2eb8.js",revision:"061a215fb1ad2eb8"},{url:"/_next/static/chunks/pages/note/%5Bid%5D-60ccab30c1477cfd.js",revision:"60ccab30c1477cfd"},{url:"/_next/static/chunks/pages/user-3568244e3243e51b.js",revision:"3568244e3243e51b"},{url:"/_next/static/chunks/pages/user/%5Bid%5D-7d71cabee2760bd9.js",revision:"7d71cabee2760bd9"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-fd4f91242f61bc21.js",revision:"fd4f91242f61bc21"},{url:"/_next/static/css/d507b6f15b61f30d.css",revision:"d507b6f15b61f30d"},{url:"/_next/static/media/Framework7Icons-Regular.06b5dbf8.woff",revision:"06b5dbf8"},{url:"/_next/static/media/Framework7Icons-Regular.7ae7ef96.woff2",revision:"7ae7ef96"},{url:"/_next/static/media/Framework7Icons-Regular.e33ae4a7.ttf",revision:"e33ae4a7"},{url:"/_next/static/media/MaterialIcons-Regular.53374078.ttf",revision:"53374078"},{url:"/_next/static/media/MaterialIcons-Regular.70974c27.woff",revision:"70974c27"},{url:"/_next/static/media/MaterialIcons-Regular.88f314d9.eot",revision:"88f314d9"},{url:"/_next/static/media/MaterialIcons-Regular.e2c5c7e6.woff2",revision:"e2c5c7e6"},{url:"/_next/static/media/MaterialIconsOutlined-Regular.0a26502a.woff2",revision:"0a26502a"},{url:"/_next/static/media/MaterialIconsOutlined-Regular.139f3391.eot",revision:"139f3391"},{url:"/_next/static/media/MaterialIconsOutlined-Regular.156a22e8.otf",revision:"156a22e8"},{url:"/_next/static/media/MaterialIconsOutlined-Regular.f075b9d4.woff",revision:"f075b9d4"},{url:"/_next/static/media/MaterialIconsRound-Regular.4ba8e871.woff",revision:"4ba8e871"},{url:"/_next/static/media/MaterialIconsRound-Regular.83d16847.eot",revision:"83d16847"},{url:"/_next/static/media/MaterialIconsRound-Regular.ad4658bb.otf",revision:"ad4658bb"},{url:"/_next/static/media/MaterialIconsRound-Regular.cb7edca4.woff2",revision:"cb7edca4"},{url:"/_next/static/media/MaterialIconsSharp-Regular.324af046.woff",revision:"324af046"},{url:"/_next/static/media/MaterialIconsSharp-Regular.3da141dc.woff2",revision:"3da141dc"},{url:"/_next/static/media/MaterialIconsSharp-Regular.9f431456.otf",revision:"9f431456"},{url:"/_next/static/media/MaterialIconsSharp-Regular.cf6810ba.eot",revision:"cf6810ba"},{url:"/_next/static/media/MaterialIconsTwoTone-Regular.3e73adda.woff",revision:"3e73adda"},{url:"/_next/static/media/MaterialIconsTwoTone-Regular.62e729ab.woff2",revision:"62e729ab"},{url:"/_next/static/media/MaterialIconsTwoTone-Regular.6dfbd513.otf",revision:"6dfbd513"},{url:"/_next/static/media/MaterialIconsTwoTone-Regular.c5d35199.eot",revision:"c5d35199"},{url:"/_next/static/media/phone-frame.d4b6b62a.svg",revision:"e83df8ab6553f90e71fe425bd8847cca"},{url:"/_offline",revision:"Mtui38nvcgr37zueoe-lM"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/favicon/android-chrome-192x192.png",revision:"3c505e0ef016b70c242779fb44c1bbef"},{url:"/favicon/android-chrome-384x384.png",revision:"fbcb28d8424cb3ba82966aa43ea4e502"},{url:"/favicon/apple-touch-icon.png",revision:"6ae38067607a652d6e4a9865ea1e22b4"},{url:"/favicon/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/favicon/favicon-16x16.png",revision:"4a5f9b726f9aaa08f7d6004d78041cb8"},{url:"/favicon/favicon-32x32.png",revision:"3abd9fc3c249f823a3ffa0740dbe6fca"},{url:"/favicon/favicon.ico",revision:"4fb66d57eee1d8928f872dbe4cfe88f2"},{url:"/favicon/mstile-150x150.png",revision:"78d43a0cbfb465fdabff11f8f9b7a946"},{url:"/favicon/safari-pinned-tab.svg",revision:"c8d4d4dd5a932d8e75ce0dcd7b9299e1"},{url:"/images/icons/users.svg",revision:"1d1fc23162559c9d11e00898758668b9"},{url:"/images/logo/rounded-512.png",revision:"def57e99e536308702f10a70176c1533"},{url:"/images/logo/squared-192.png",revision:"5caa0360ec2234c00260912f6f479f3b"},{url:"/images/logo/squared-512.png",revision:"aec8fda99dc597cf62b3aadc99cc782b"},{url:"/images/logo/squared-vector.svg",revision:"322c4dc202f5dfcf0a7f8577cb781d0c"},{url:"/manifest.json",revision:"3b97a7accdacfc9ce71eaadbe322b00e"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/splash/kiwi-3001 × 2823.png",revision:"21c93f7c83b8514a29b4c416ea9f2626"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
