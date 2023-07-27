import {
  Badge,
  Block,
  Button,
  Card,
  CardFooter,
  List,
  ListInput,
  ListItem,
  Toggle,
  f7,
} from "framework7-react";
import SettingsZap from "./zap";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import SettingsRelay from "./relay";
// import SettingsNav from "./nav";
import SettingsReaction from "./reaction";
import { useSessionStore } from "@/libs/zustand/session";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";

export default function SettingsPage() {
  return (
    <>
      <LookAndFeel />
      <SettingsZap />
      {/* <SettingsReaction /> */}
      {/* <SettingsNav /> */}
      <SpamFilters />
      <SettingsRelay />
    </>
  );
}

function LookAndFeel() {
  return (
    <Card outline title="Look and Feel" headerDivider>
      <List>
        <DarkToggle />
        <CommunityShowAllNotesToggle />
      </List>
    </Card>
  );
}

function CommunityShowAllNotesToggle() {
  const isClientActive = useSessionStore((state) => state.isClientActive);
  const communityShowAllNotes = usePersistSettingsStore(
    (state) => state.communityShowAllNotes
  );
  const setCommunityShowAllNotes = usePersistSettingsStore(
    (state) => state.setCommunityShowAllNotes
  );

  return (
    <>
      {isClientActive && (
        <List>
          <ListItem title="Show all notes">
            <span slot="after">
              <Toggle
                checked={communityShowAllNotes}
                onChange={() =>
                  setCommunityShowAllNotes(!communityShowAllNotes)
                }
              />
            </span>
          </ListItem>
        </List>
      )}
    </>
  );
}

function DarkToggle() {
  const darkMode = usePersistSettingsStore((state) => state.darkMode);
  const isClientActive = useSessionStore((state) => state.isClientActive);
  const toggleDarkMode = usePersistSettingsStore(
    (state) => state.toggleDarkMode
  );

  return (
    <>
      {isClientActive && (
        <List>
          <ListItem title="Dark mode">
            <span slot="after">
              <Toggle checked={darkMode} onChange={() => toggleDarkMode()} />
            </span>
          </ListItem>
        </List>
      )}
    </>
  );
}

function SpamFilters() {
  const spamFilters = usePersistSettingsStore((state) => state.spamFilters);
  const setSpamFilters = usePersistSettingsStore(
    (state) => state.setSpamFilters
  );

  function removeFilter(text: string) {
    var index = spamFilters.indexOf(text);
    if (index !== -1) {
      spamFilters.splice(index, 1);
    }
    setSpamFilters([...spamFilters]);
  }

  function promptNewSpam() {
    f7.dialog.prompt("Filter this word", "Add Spam Filter", (word) => {
      setSpamFilters([...spamFilters, word]);
    });
  }

  return (
    <Card outline title="Spam Filters" headerDivider footerDivider>
      <List simpleList>
        {spamFilters.map((text, i) => {
          return (
            <ListItem key={i} title={text}>
              <span slot="after">
                <Button onClick={() => removeFilter(text)}>
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </span>
            </ListItem>
          );
        })}
      </List>
      <Button fill onClick={() => promptNewSpam()}>
        New Spam Filter
      </Button>
      <CardFooter>Filters are applied to all replies.</CardFooter>
    </Card>
  );
}
