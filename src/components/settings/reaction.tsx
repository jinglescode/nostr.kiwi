import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Badge,
  Button,
  Card,
  List,
  ListInput,
  ListItem,
} from "framework7-react";
import { useState } from "react";

export default function SettingsReaction() {
  const reactions = usePersistSettingsStore((state) => state.reactions);
  const setReactions = usePersistSettingsStore((state) => state.setReactions);
  const [inputReaction, setInputReaction] = useState<string>("");

  function removeReaction(reaction: string) {
    let updatedReactions = [...reactions];
    const index = updatedReactions.indexOf(reaction);
    if (index !== -1) {
      updatedReactions.splice(index, 1);
    }
    setReactions(updatedReactions);
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.keyCode === 13) {
      let updatedReaction = [...reactions];
      updatedReaction.push(inputReaction);
      setReactions(updatedReaction);
      setInputReaction("");
    }
  }

  // function setDefault(reaction: string) {
  //   const index = reactions.indexOf(reaction);
  //   const updatedReactions = [...reactions];
  //   updatedReactions[index] = updatedReactions[0];
  //   updatedReactions[0] = reaction;
  //   setReactions(updatedReactions);
  // }

  return (
    <Card
      outline
      title="Reactions"
      footer="Hold the reaction button at the note to use these reactions."
      headerDivider
      footerDivider
    >
      <List>
        <ListInput
          label="Add another reaction"
          placeholder="e.g. 💪"
          value={inputReaction}
          onChange={(e) => {
            //@ts-ignore
            setInputReaction(e.target.value);
          }}
          // onKeyUp={handleKeyUp}
        />

        {reactions.map((reaction, i) => {
          return (
            <ListItem
              key={reaction}
              //@ts-ignore
              // title={
              //   <>
              //     {i == 0 ? (
              //       <Badge colors={{ bg: "bg-green-500" }}>Default</Badge>
              //     ) : (
              //       <Badge
              //         colors={{ bg: "bg-gray-500" }}
              //         onClick={() => setDefault(reaction)}
              //       >
              //         Set default
              //       </Badge>
              //     )}
              //   </>
              // }
              media={reaction}
              // after={
              //   <>
              //     <Button onClick={() => removeReaction(reaction)}>
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
