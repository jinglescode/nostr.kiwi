import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { App, View } from "framework7-react";

import { routes } from "../routes";
import Providers from "./providers";
import AppActionSheet from "../AppActionSheet";
import AppToast from "../AppToast";
import NoteComposeFab from "@/components/note/NoteComposeFab";
import AppPopup from "../AppPopup";

export default function AppInit({
  children,
}: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_HOST}${router.asPath}`;

  const [clientActive, setClientActive] = useState(false);

  useEffect(() => {
    async function load() {
      setClientActive(true);
    }
    load();
  }, []);

  return (
    <>
      <Providers>
        <>
          {clientActive && (
            <App
              routes={routes}
              url={url}
              colors={{
                primary: "#7E81FF",
                "brand-2": "#635EC0",
                "brand-3": "#262230",
                "brand-4": "#141119",
                white: "#ffffff",
                black: "#000000",
              }}
              darkMode={true}
              touch={{ tapHold: true }}
              theme='ios'
            >
              <View
                main
                browserHistory
                browserHistorySeparator=""
                browserHistoryInitialMatch={true}
                browserHistoryStoreHistory={false}
                url="/for-you"
              >
                {children}
                <AppActionSheet />
                <AppToast />
                <AppPopup />
              </View>
            </App>
          )}
        </>
      </Providers>
    </>
  );
}
