import {
  Badge,
  Button,
  Card,
  List,
  ListInput,
  ListItem,
  Toggle,
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
      <SettingsReaction />
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
        <ListItem title="Show all notes">
          <span slot="after">
            <Toggle
              checked={communityShowAllNotes}
              onChange={() => setCommunityShowAllNotes(!communityShowAllNotes)}
            />
          </span>
        </ListItem>
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
        <ListItem title="Dark mode">
          <span slot="after">
            <Toggle checked={darkMode} onChange={() => toggleDarkMode()} />
          </span>
        </ListItem>
      )}
    </>
  );
}

function SpamFilters() {
  const spamFilters = usePersistSettingsStore((state) => state.spamFilters);
  const setSpamFilters = usePersistSettingsStore(
    (state) => state.setSpamFilters
  );
  const [input, setInput] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let _search = e.target.value.toLowerCase();
    setInput(_search);
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.keyCode === 13) {
      setSpamFilters([...spamFilters, input]);
      setInput("");
    }
  }

  function removeFilter(text: string) {
    var index = spamFilters.indexOf(text);
    if (index !== -1) {
      spamFilters.splice(index, 1);
    }
    setSpamFilters([...spamFilters]);
  }

  return (
    <Card
      outline
      title="Spam Filters"
      footer="Filters are applied to all replies."
      headerDivider
      footerDivider
    >
      <List>
        <ListInput
          label="New keywords"
          placeholder="e.g. free money"
          onChange={handleChange}
          // onKeyUp={handleKeyUp}
          value={input}
        />
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
    </Card>
  );
}
