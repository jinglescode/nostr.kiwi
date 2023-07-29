import { AppProps } from "next/app";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import "framework7/css/bundle";
import "framework7-icons/css/framework7-icons.css";
import "material-icons/iconfont/material-icons.css";
import "../styles/globals.css";

//@ts-ignore
import Framework7 from "framework7/lite-bundle";
import Framework7React from "framework7-react";
Framework7.use(Framework7React);

import HeadMeta from "@/components/site/headmeta";
// import AppInit from "@/components/app/init";
const DynamicAppInit = dynamic(() => import("@/components/app/init"), {
  ssr: false,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <HeadMeta />

      {router.asPath == "/" ? (
        <Component {...pageProps} />
      ) : (
        <DynamicAppInit>
          <Component {...pageProps} />
        </DynamicAppInit>
      )}
    </>
  );
}
