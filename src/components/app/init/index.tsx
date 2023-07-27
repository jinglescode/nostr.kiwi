import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { App, View, f7ready } from "framework7-react";

import { routes } from "../routes";
import Providers from "./providers";
import AppActionSheet from "../AppActionSheet";
import AppToast from "../AppToast";
import AppPopup from "../AppPopup";
import NotePopup from "@/components/note/NotePopup";
import AppDialog from "../AppDialog";

export default function AppInit({
  children,
}: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_HOST}${router.asPath}`;

  const [clientActive, setClientActive] = useState(false);
  const [isF7ready, setIsF7ready] = useState(false);

  useEffect(() => {
    async function load() {
      setClientActive(true);
    }
    load();
  }, []);

  useEffect(() => {
    f7ready((f7) => {
      setIsF7ready(true);
    });
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
              theme="ios"
            >
              <>
                {isF7ready && (
                  <>
                    <View
                      main
                      // browserHistory
                      // browserHistorySeparator=""
                      // browserHistoryInitialMatch={true}
                      // browserHistoryStoreHistory={false}
                      // url="/for-you"
                    >
                      {children}
                      {/* <AppLayout /> */}
                    </View>
                    <NotePopup />
                    <AppActionSheet />
                    <AppToast />
                    <AppPopup />
                    <AppDialog />
                  </>
                )}
              </>
            </App>
          )}
        </>
      </Providers>
    </>
  );
}
