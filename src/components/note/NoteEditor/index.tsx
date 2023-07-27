import { TextEditor } from "framework7-react";

export default function NoteEditor() {
  return (
    <TextEditor
      placeholder="what do you want to say?"
      resizable
      buttons={[]}
    />
  );
}
