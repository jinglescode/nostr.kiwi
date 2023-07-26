import { useState } from "react";
import MainMenu from "./MainMenu";
import { LoginScreen } from "./enumLoginScreen";
import LoginWithSecret from "./LoginWithSecret";
import LoginWithNip07 from "./LoginWithNip07";
import LoginWithNip46 from "./LoginWithNip46";
import { Page } from "framework7-react";

export default function LoginPage() {
  const [showMenu, setShowMenu] = useState<LoginScreen>(LoginScreen.Main);

  return (
    <Page>
      <style jsx>{`
        .fadeOut {
          opacity: 0;
          height: 0;
          transition: height 0.5s 0.5s, opacity 0.5s;
        }
        .fadeIn {
          opacity: 1;
          transition: height 0.5s, opacity 0.5s 0.5s;
        }
      `}</style>

      <div className="overflow-hidden h-full">
        <div
          className={`h-full ${
            showMenu == LoginScreen.Main ? "fadeIn" : "fadeOut"
          }`}
        >
          <MainMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>

        <div
          className={`h-full ${
            showMenu == LoginScreen.SK ? "fadeIn" : "fadeOut"
          }`}
        >
          <LoginWithSecret setShowMenu={setShowMenu} />
        </div>

        <div
          className={`h-full ${
            showMenu == LoginScreen.NIP07 ? "fadeIn" : "fadeOut"
          }`}
        >
          <LoginWithNip07 setShowMenu={setShowMenu} />
        </div>

        <div
          className={`h-full ${
            showMenu == LoginScreen.NIP46 ? "fadeIn" : "fadeOut"
          }`}
        >
          <LoginWithNip46 setShowMenu={setShowMenu} />
        </div>
      </div>
    </Page>
  );
}
