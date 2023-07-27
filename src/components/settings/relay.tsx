import { useNDK } from "@/libs/ndk";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { useSessionStore } from "@/libs/zustand/session";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Badge,
  Button,
  Card,
  CardFooter,
  List,
  ListInput,
  ListItem,
  f7,
} from "framework7-react";
import { useState } from "react";

export default function SettingsRelay() {
  const { ndk } = useNDK();
  const relays = usePersistSettingsStore((state) => state.relays);
  const setRelays = usePersistSettingsStore((state) => state.setRelays);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);

  function removeRelay(relayName: string) {
    let updatedRelaySet = [...relays];
    const index = updatedRelaySet.indexOf(relayName);
    if (index !== -1) {
      updatedRelaySet.splice(index, 1);
    }
    setRelays(updatedRelaySet);
    setToastMessage(`${relayName} removed.`);
  }

  if (ndk === undefined) return <></>;

  function promptNewRelay() {
    f7.dialog.prompt(
      "Enter relay address e.g. wss://relay.example.com",
      "Add Relay",
      (inputRelay) => {
        let updatedRelaySet = [...relays];
        updatedRelaySet.push(inputRelay);
        setRelays(updatedRelaySet);
        setToastMessage(`${inputRelay} added.`);
      }
    );
  }

  return (
    <Card outline title="Relays" headerDivider footerDivider>
      <List>
        {relays.map((relay, key) => {
          const thisRelay = ndk.pool.relays.get(relay);
          return (
            <ListItem key={relay} title={relay}>
              <span slot="after">
                <Button onClick={() => removeRelay(relay)}>
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </span>
              <span slot="media">
                <Badge
                  color={thisRelay?.status === 1 ? "green" : "red"}
                ></Badge>
              </span>
            </ListItem>
          );
        })}
      </List>

      <Button fill onClick={() => promptNewRelay()}>
        New Relay
      </Button>
      <CardFooter>Add/remove relays takes effect after restarting.</CardFooter>
    </Card>
  );
}
