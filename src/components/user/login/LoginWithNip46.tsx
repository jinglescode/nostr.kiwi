import { useNDK } from "@/libs/ndk";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useState } from "react";
import { Block, BlockTitle, Link, List, ListButton } from "framework7-react";
import { LoginLocalStorage } from "@/types/LoginLocalStorage";
import { LoginScreen } from "./enumLoginScreen";
import Input from "@/components/common/form/Input";

export default function LoginWithNip46({
  setShowMenu,
}: {
  setShowMenu: Function;
}) {
  const { loginWithNip46 } = useNDK();

  const setUser = usePersistUserStore((state) => state.setUser);
  const [loading, setLoading] = useState<boolean>(false);

  const [inputUserNpub, setinputUserNpub] = useState<string>("");

  async function handleLogin() {
    if (inputUserNpub.length < 1) return;

    setLoading(true);
    const _user = await loginWithNip46(inputUserNpub);
    if (_user) {
      const user: LoginLocalStorage = {
        type: "nip46",
        npub: _user.npub,
        sk: _user.sk,
        pk: (await _user.remoteSigner.user()).hexpubkey(),
        token: _user.token,
      };
      setUser(user);
    }
    setLoading(false);
  }

  return (
    <>
      <BlockTitle large>Login with Nostr Connect</BlockTitle>
      {!loading ? (
        <>
          <List inset strong>
            <Block>
              <p>
                Login and sign events without entering your private key on this
                client. One way you can do it is using{" "}
                <Link
                  //@ts-ignore
                  href="https://nsecbunker.com/"
                  target="_blank"
                >
                  nsecBunker
                </Link>{" "}
                (
                <Link
                  //@ts-ignore
                  href="https://lnshort.it/nsecbunker"
                  target="_blank"
                >
                  learn more
                </Link>
                ).
              </p>
            </Block>
            <Input
              value={inputUserNpub}
              onChange={(e) => setinputUserNpub(e.target.value)}
              placeholder="npub1...123 or npub1..123#..abc"
              label="npub or token"
              type="password"
            />
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
