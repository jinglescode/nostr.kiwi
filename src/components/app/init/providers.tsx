import { useEffect, useRef } from "react";

import { get, set, del } from "idb-keyval";
import {
  PersistQueryClientProvider,
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";
import { QueryClient } from "@tanstack/react-query";

import { NDKProvider, useNDK } from "@/libs/ndk";

import { useSessionStore } from "@/libs/zustand/session";

import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  },
});

export function createIDBPersister(idbValidKey: IDBValidKey = "nostrkiwi") {
  return {
    persistClient: async (client: PersistedClient) => {
      set(idbValidKey, client);
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey);
    },
    removeClient: async () => {
      await del(idbValidKey);
    },
  } as Persister;
}

const persister = createIDBPersister();

export default function Providers({
  children,
}: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) {
  const relays = usePersistSettingsStore((state) => state.relays);

  return (
    <>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: persister,
        }}
      >
        <NDKProvider relayUrls={relays}>
          {children}
          <LoadNDK />
        </NDKProvider>
      </PersistQueryClientProvider>

      <LoadStates />
    </>
  );
}

function LoadNDK() {
  const { loginWithNip46, loginWithSecret, loginWithNip07 } = useNDK();
  const user = usePersistUserStore((state) => state.user);
  const loaded = useRef<boolean>(false);

  useEffect(() => {
    async function load() {
      if (user !== undefined && loaded.current === false) {
        loaded.current = true;
        if (user.type == "nip46") {
          await loginWithNip46(user.token!, user.sk!);
        }
        if (user.type == "sk" && user.sk) {
          await loginWithSecret(user.sk);
        }
        if (user.type == "nip07") {
          await loginWithNip07();
        }
      }
    }
    load();
  }, []);

  return <></>;
}

function LoadStates() {
  const setClientActive = useSessionStore((state) => state.setClientActive);

  useEffect(() => {
    async function load() {
      setClientActive(true);
    }
    load();
  }, []);

  return <></>;
}
