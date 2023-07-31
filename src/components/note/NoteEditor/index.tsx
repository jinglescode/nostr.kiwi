import { useCommunityChatPost } from "@/libs/ndk/hooks/useCommunityChatPost";
import { useNotePost } from "@/libs/ndk/hooks/useNotePost";
import { useSessionStore } from "@/libs/zustand/session";
import { useSessionNoteStore } from "@/libs/zustand/sessionNoteStore";
import { TImageUpload } from "@/types/Note";
import { Block, Button, Page } from "framework7-react";
import { useEffect, useRef, useState } from "react";
import { nip19 } from "nostr-tools";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { getTagsFromContent } from "@/libs/ndk/utils/note";

export default function NoteEditor() {
  const noteEditorMetadata = useSessionNoteStore(
    (state) => state.noteEditorMetadata
  );
  const setNoteEditorMetadata = useSessionNoteStore(
    (state) => state.setNoteEditorMetadata
  );
  const setAppDialog = useSessionStore((state) => state.setAppDialog);
  const setAppPopup = useSessionStore((state) => state.setAppPopup);

  const setToastMessage = useSessionStore((state) => state.setToastMessage);
  const noteEditorHeight = useSessionNoteStore(
    (state) => state.noteEditorHeight
  );
  const setNoteEditorHeight = useSessionNoteStore(
    (state) => state.setNoteEditorHeight
  );

  const { mutate: mutateNote, isSuccess, isError } = useNotePost();
  const {
    mutate: mutateCommunityChat,
    isSuccess: isSuccessCommunityChat,
    isError: isErrorCommunityChat,
  } = useCommunityChatPost();

  const [gifSearchOpened, setGifSearchOpened] = useState(false);
  const [listOfUploadedImages, setlistOfUploadedImages] = useState<
    TImageUpload[]
  >([]);
  const [showPreview, setShowPreview] = useState(false);
  const [inputNoteBody, setInputNoteBody] = useState<string>("");
  const [suggestionModalOpened, setSuggestionModalOpened] =
    useState<boolean>(false);

  const inputFile = useRef(null);

  const community = noteEditorMetadata?.community;
  const replyNote = noteEditorMetadata?.replyNote;
  const quoteNote = noteEditorMetadata?.quoteNote;
  const communityChat = noteEditorMetadata?.communityChat;

  useEffect(() => {
    if (quoteNote && inputNoteBody.length == 0) {
      const noteId = nip19.noteEncode(quoteNote.id);
      setInputNoteBody(`\n\nnostr:${noteId}`);
    }
  }, [noteEditorMetadata]);

  useEffect(() => {
    if (isSuccess) {
      setToastMessage("Note posted");
      setNoteEditorMetadata(undefined);
      setInputNoteBody("");
      setAppDialog(undefined);
      setAppPopup(undefined);
    }
    if (isError) {
      setToastMessage("Failed to post note");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessCommunityChat) {
      // setAppDialog(undefined);
      // setAppPopup(undefined);
    }
    if (isErrorCommunityChat) {
      setToastMessage("Failed to send message");
    }
  }, [isSuccessCommunityChat, isErrorCommunityChat]);

  function appendText(text: string) {
    setInputNoteBody(`${inputNoteBody}${text}`);
  }

  async function postNote() {
    let _inputNoteBody = inputNoteBody.trim();

    if (_inputNoteBody.length === 0) return;

    if (!communityChat) {
      setToastMessage("Posting note...");
    }

    const note = new NDKEvent();
    note.content = _inputNoteBody;
    note.tags = [];
    note.kind = 1;

    // create image tags
    if (listOfUploadedImages.length > 0) {
      for (let image of listOfUploadedImages) {
        let imageTags: string[] = [];

        imageTags.push("imeta");

        for (let key in image) {
          //@ts-ignore
          const value = image[key];
          if (value.length > 0) {
            imageTags.push(`${key} ${value}`);
          }
        }
        //@ts-ignore
        note.tags.push(imageTags);
      }
    }

    // community tag
    if (community) {
      note.tags.push(["a", community.id, ""]);
    }

    // reply
    if (replyNote) {
      // tag the author tag
      note.tags.push(["p", replyNote.authorPk]);
      const pTags = replyNote.tags.filter((t) => t[0] === "p");
      for (const p of pTags) {
        note.tags.push(["p", p[1]]);
      }

      // tag the root tag
      const eTags = replyNote.tags.filter((t) => t[0] === "e");
      if (eTags.length === 0) {
        note.tags.push(["e", replyNote.id, "", "root"]);
      } else if (eTags.length > 0) {
        const rootETags = eTags.filter((t) => t[3] === "root");
        if (rootETags.length > 0) {
          note.tags.push(["e", rootETags[0][1], "", "root"]);
        } else {
          const replyETags = eTags.filter((t) => t[3] === "reply");
          if (replyETags.length > 0) {
            note.tags.push(["e", replyETags[0][1], "", "root"]);
          }
        }
      }

      // tag the reply tag
      note.tags.push(["e", replyNote.id, "", "reply"]);
    }

    // quote
    if (quoteNote) {
      note.tags.push(["p", quoteNote.authorPk]);
      note.tags.push(["q", quoteNote.id]);
    }

    // communityChat
    if (communityChat) {
      note.kind = 42;
      note.tags.push(["a", communityChat.community.id, "", "root"]);
    }

    // hashtags
    const regexHashtags = /(#\w+)/g;
    const foundTags = note.content.match(regexHashtags);
    if (foundTags != null) {
      for (let tag of foundTags) {
        note.tags.push(["t", tag.substring(1)]);
      }
    }

    const moreTags = getTagsFromContent(note.content);
    note.tags = [...note.tags, ...moreTags];

    console.log("going to publish note", note);

    if (communityChat) {
      mutateCommunityChat(note);
      setInputNoteBody("");
    } else {
      mutateNote({
        event: note,
        isCommunity: community !== undefined ? community.id : undefined,
        isReply: replyNote ? replyNote.id : undefined,
      });
    }
  }

  // function handleChange(event: any) {
  //   setInputNoteBody(event.target.value);
  //   //@ts-ignore
  //   const height = event.target.scrollHeight;
  //   if (height < 300) {
  //     setNoteEditorHeight(height);
  //   }
  // }

  // function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === "Enter" || e.keyCode === 13) {
  //     if (communityChat) {
  //       postNote();
  //     }
  //   }
  // }

  return (
    <>
      <div className="flex flex-col">
        {/* <TextEditor
        placeholder="what do you want to say?"
        resizable
        buttons={[]}
        value={inputNoteBody}
        onTextEditorChange={(value) => setInputNoteBody(value)}
      /> */}

        <div className="w-full dark:border-gray-600 p-4 flex-1">
          <textarea
            rows={15}
            className="w-full px-0 text-sm text-gray-900 dark:text-white dark:placeholder-gray-400 border-2 border-gray-200 rounded-lg"
            placeholder="what do you want to say?"
            value={inputNoteBody}
            onChange={(e) => setInputNoteBody(e.target.value)}
          ></textarea>
        </div>
        {/* <List>
        <ListInput
          placeholder="what do you want to say?"
          resizable
          value={inputNoteBody}
          onChange={(e) => setInputNoteBody(e.target.value)}
          outline
          size={20}
        />
      </List> */}
        <Block>
          <Button fill onClick={() => postNote()}>
            POST{community && " TO " + community.name}
          </Button>
        </Block>
      </div>
    </>
  );
}
