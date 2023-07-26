import { useNDK } from "@/libs/ndk";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
import { useState } from "react";
import {
  Block,
  BlockTitle,
  Link,
  List,
  ListButton,
} from "framework7-react";
import { LoginLocalStorage } from "@/types/LoginLocalStorage";
import { LoginScreen } from "./enumLoginScreen";
import Input from "@/components/common/form/Input";

export default function LoginWithSecret({
  setShowMenu,
}: {
  setShowMenu: Function;
}) {
  const { loginWithSecret } = useNDK();

  const setUser = usePersistUserStore((state) => state.setUser);
  const [loading, setLoading] = useState<boolean>(false);

  const [inputUserSecret, setinputUserSecret] = useState<string>("");

  async function handleLogin() {
    if (inputUserSecret.length < 1) return;

    setLoading(true);
    const _user = await loginWithSecret(inputUserSecret);
    if (_user) {
      const user: LoginLocalStorage = {
        type: "sk",
        npub: _user.npub,
        sk: _user.sk,
        pk: (await _user.signer.user()).hexpubkey(),
      };
      setUser(user);
    }
    setLoading(false);
  }

  return (
    <>
      <BlockTitle large>Login with Secret Key</BlockTitle>
      {!loading ? (
        <>
          <List inset strong>
            <Block>
              <p>
                Login and sign events with your private key stored on your
                device. Do not have a private key? You can create one at{" "}
                <Link
                  //@ts-ignore
                  href="https://nosta.me/"
                  target="_blank"
                >
                  Nosta
                </Link>
                .
              </p>
            </Block>
            <Input
              value={inputUserSecret}
              onChange={(e) => setinputUserSecret(e.target.value)}
              placeholder="nsec1..."
              label="Private key"
              type="password"
              info="Your private key is stored on your device."
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
