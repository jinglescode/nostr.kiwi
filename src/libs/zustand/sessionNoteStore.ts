import { TNoteEditorMetadata, TNotePanel } from "@/types/App";
import { create } from "zustand";

interface SessionState {
  noteEditorMetadata: TNoteEditorMetadata | undefined;
  setNoteEditorMetadata: (
    noteEditorMetadata: TNoteEditorMetadata | undefined
  ) => void;

  noteEditorHeight: number;
  setNoteEditorHeight: (height: number) => void;

  notePanel: TNotePanel | undefined;
  setNotePanel: (notePanel: TNotePanel | undefined) => void;
}

export const useSessionNoteStore = create<SessionState>()((set, get) => ({
  noteEditorMetadata: undefined,
  setNoteEditorMetadata: (noteEditorMetadata) => set({ noteEditorMetadata }),
  noteEditorHeight: 40,
  setNoteEditorHeight: (height) => set({ noteEditorHeight: height }),
  notePanel: undefined,
  setNotePanel: (notePanel) => set({ notePanel: notePanel }),
}));
