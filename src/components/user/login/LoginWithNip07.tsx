import { useNDK } from "@/libs/ndk";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useState } from "react";
import { Block, BlockTitle, Link, List, ListButton } from "framework7-react";
import { LoginLocalStorage } from "@/types/LoginLocalStorage";
import { LoginScreen } from "./enumLoginScreen";

export default function LoginWithNip07({
  setShowMenu,
}: {
  setShowMenu: Function;
}) {
  const { loginWithNip07 } = useNDK();

  const setUser = usePersistUserStore((state) => state.setUser);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin() {
    setLoading(true);
    const _user = await loginWithNip07();
    if (_user) {
      const user: LoginLocalStorage = {
        type: "nip07",
        npub: _user.npub,
        pk: (await _user.signer.user()).hexpubkey(),
      };
      setUser(user);
    }
    setLoading(false);
  }

  return (
    <>
      <BlockTitle large>Login with Browser Extensions</BlockTitle>
      {!loading ? (
        <>
          <List inset strong>
            <Block>
              <p>
                Manage and sign events with a browser extension. Note that this
                method does not work in PWA fullscreen app mode (
                <Link
                  //@ts-ignore
                  href="https://blog.getalby.com/how-to-use-nostr-with-the-alby-extension/"
                  target="_blank"
                >
                  learn more
                </Link>
                ).
              </p>
            </Block>
            <ListButton onClick={() => handleLogin()}>Connect</ListButton>
            <ListButton onClick={() => setShowMenu(LoginScreen.Main)}>
              Cancel
            </ListButton>
          </List>
        </>
      ) : (
        <Block>Connecting...</Block>
      )}
    </>
  );
}
