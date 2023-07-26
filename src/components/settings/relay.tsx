import { useNDK } from "@/libs/ndk";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { useSessionStore } from "@/libs/zustand/session";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Badge, Button, Card, List, ListInput, ListItem } from "framework7-react";
import { useState } from "react";

export default function SettingsRelay() {
  const { ndk } = useNDK();
  const relays = usePersistSettingsStore((state) => state.relays);
  const setRelays = usePersistSettingsStore((state) => state.setRelays);
  const setToastMessage = useSessionStore((state) => state.setToastMessage);
  const [inputRelay, setInputRelay] = useState<string>("");

  function removeRelay(relayName: string) {
    let updatedRelaySet = [...relays];
    const index = updatedRelaySet.indexOf(relayName);
    if (index !== -1) {
      updatedRelaySet.splice(index, 1);
    }
    setRelays(updatedRelaySet);
    setToastMessage(`${relayName} removed.`);
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.keyCode === 13) {
      let updatedRelaySet = [...relays];
      updatedRelaySet.push(inputRelay);
      setRelays(updatedRelaySet);
      setToastMessage(`${inputRelay} added.`);
      setInputRelay("");
    }
  }

  if (ndk === undefined) return <></>;

  return (
    <Card
      outline
      title="Relays"
      footer="Add/remove relays takes effect after restarting."
      headerDivider
      footerDivider
    >
      <List>
        <ListInput
          label="Add another relay"
          placeholder="e.g. wss://relay.example.com"
          value={inputRelay}
          onChange={(e) => {
            //@ts-ignore
            setInputRelay(e.target.value);
          }}
          // onKeyUp={handleKeyUp}
        />

        {relays.map((relay, key) => {
          const thisRelay = ndk.pool.relays.get(relay);

          return (
            <ListItem
              key={relay}
              title={relay}
              // media={
              //   <Badge
              //     colors={{
              //       bg: thisRelay?.status === 1 ? "bg-green-500" : "bg-red-500",
              //     }}
              //   ></Badge>
              // }
              // after={
              //   <>
              //     <Button onClick={() => removeRelay(relay)}>
              //       <TrashIcon className="w-4 h-4" />
              //     </Button>
              //   </>
              // }
            />
          );
        })}
      </List>
    </Card>
  );
}
