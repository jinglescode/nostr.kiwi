import NDK, {
  NDKEvent,
  NDKFilter,
  NDKNip07Signer,
  NDKNip46Signer,
  NDKPrivateKeySigner,
} from "@nostr-dev-kit/ndk";
import { PropsWithChildren, createContext, useContext } from "react";
import NDKInstance from "./instance";
import { _loginWithNip07, _loginWithNip46, _loginWithSecret } from "./signers";
import { Block, Preloader } from "framework7-react";

interface NDKContext {
  ndk: NDK;
  signer: NDKPrivateKeySigner | NDKNip46Signer | NDKNip07Signer | undefined;
  fetchEvents: (filter: NDKFilter) => Promise<NDKEvent[]>;
  fetchEventsEOSE: (filter: NDKFilter) => Promise<NDKEvent[]>;
  loginWithNip46: (
    npub: string,
    sk?: string
  ) => Promise<
    | undefined
    | {
        type: string;
        npub: string;
        sk: string | undefined;
        token: string;
        remoteSigner: NDKNip46Signer;
        localSigner: NDKPrivateKeySigner;
      }
  >;
  loginWithSecret: (skOrNsec: string) => Promise<
    | undefined
    | {
        type: string;
        npub: string;
        sk: string;
        signer: NDKPrivateKeySigner;
      }
  >;
  loginWithNip07: () => Promise<
    | undefined
    | {
        type: string;
        npub: string;
        signer: NDKNip07Signer;
      }
  >;
  signPublishEvent: (
    event: NDKEvent,
    repost?: boolean
  ) => Promise<undefined | NDKEvent>;
}

const NDKContext = createContext<NDKContext>({
  ndk: new NDK({}),
  signer: undefined,
  fetchEvents: (_: NDKFilter) => Promise.resolve([]),
  fetchEventsEOSE: (_: NDKFilter) => Promise.resolve([]),
  loginWithNip46: (_: string, __?: string) => Promise.resolve(undefined),
  loginWithSecret: (_: string) => Promise.resolve(undefined),
  loginWithNip07: () => Promise.resolve(undefined),
  signPublishEvent: (_: NDKEvent, __?: boolean) => Promise.resolve(undefined),
});

const NDKProvider = ({
  children,
  relayUrls,
}: PropsWithChildren<{
  relayUrls: string[];
}>) => {
  const {
    ndk,
    signer,
    setSigner,
    fetchEvents,
    fetchEventsEOSE,
    signPublishEvent,
  } = NDKInstance(relayUrls);

  async function loginWithNip46(npub: string, sk?: string) {
    const res = await _loginWithNip46(ndk!, npub, sk);
    if (res) {
      await setSigner(res.remoteSigner);
      return res;
    }
  }

  async function loginWithSecret(skOrNsec: string) {
    const res = await _loginWithSecret(ndk!, skOrNsec);
    if (res) {
      const { signer } = res;
      await setSigner(signer);
      return res;
    }
  }

  async function loginWithNip07() {
    const res = await _loginWithNip07(ndk!);
    if (res) {
      const { signer } = res;
      await setSigner(signer);
      return res;
    }
  }

  if (ndk !== undefined) {
    return (
      <NDKContext.Provider
        value={{
          ndk: ndk,
          signer,
          fetchEvents,
          fetchEventsEOSE,
          loginWithNip07,
          loginWithNip46,
          loginWithSecret,
          signPublishEvent,
        }}
      >
        {children}
      </NDKContext.Provider>
    );
  } else {
    return (
      <>
        <Block className="text-center">
          <Preloader />
        </Block>
      </>
    );
  }
};

const useNDK = () => {
  const context = useContext(NDKContext);
  if (context === undefined) {
    throw new Error("import NDKProvider to use useNDK");
  }
  return context;
};

export { NDKProvider, useNDK };
