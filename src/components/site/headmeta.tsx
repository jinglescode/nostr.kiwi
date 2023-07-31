import Head from "next/head";

export default function HeadMeta() {
  return (
    <Head>
      <title>nostr.kiwi - communities for everyone</title>

      <link rel="manifest" href="/manifest.json" />

      <meta name="application-name" content="nostr.kiwi" />

      <meta name="mobile-web-app-capable" content="yes" />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="nostr.kiwi" />

      <meta name="apple-touch-fullscreen" content="yes" />
      <meta name="description" content="Communities for everyone" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
      />
      {/* <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
      /> */}

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        sizes="192x192"
        href="/favicon/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#5bbad5"
      />

      {/* start up screen */}

      <link
        rel="apple-touch-startup-image"
        href="/splash/kiwi-2048x2732.png"
        sizes="2048x2732"
      />
      <link
        rel="apple-touch-startup-image"
        href="/splash/kiwi-1668x2224.png"
        sizes="1668x2224"
      />
      <link
        rel="apple-touch-startup-image"
        href="/splash/kiwi-1536x2048.png"
        sizes="1536x2048"
      />
      <link
        rel="apple-touch-startup-image"
        href="/splash/kiwi-1125x2436.png"
        sizes="1125x2436"
      />
      <link
        rel="apple-touch-startup-image"
        href="/splash/kiwi-1242x2208.png"
        sizes="1242x2208"
      />
      <link
        rel="apple-touch-startup-image"
        href="/splash/kiwi-750x1334.png"
        sizes="750x1334"
      />
      <link
        rel="apple-touch-startup-image"
        href="/splash/kiwi-640x1136.png"
        sizes="640x1136"
      />

      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash/kiwi-828x1792.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash/kiwi-1242x2688.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash/kiwi-1125x2436.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash/kiwi-1242x2208.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash/kiwi-750x1334.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash/kiwi-2048x2732.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash/kiwi-1668x2224.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash/kiwi-640x1136.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash/kiwi-1668x2388.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash/kiwi-1536x2048.png"
      />
    </Head>
  );
}
