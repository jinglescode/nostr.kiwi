import { TCommunity } from "@/types/Community";
import {
  Navbar,
  Page,
  Messages,
  MessagesTitle,
  Message,
  Messagebar,
  Link,
  MessagebarAttachments,
  MessagebarAttachment,
  MessagebarSheet,
  MessagebarSheetImage,
  f7ready,
  f7,
} from "framework7-react";
import { useState } from "react";

export default function ChatMessagebar({
  community,
}: {
  community?: TCommunity;
}) {
  const [messageText, setMessageText] = useState("");

  async function sendMessage() {

  }

  return (
    <Messagebar
      placeholder="your message"
      // attachmentsVisible={attachmentsVisible()}
      // sheetVisible={sheetVisible}
      value={messageText}
      onInput={(e) => setMessageText(e.target.value)}
    >
      {/* <Link
        iconIos="f7:camera_fill"
        iconMd="material:camera_alt"
        slot="inner-start"
        onClick={() => {
          setSheetVisible(!sheetVisible);
        }}
      /> */}
      <Link
        iconIos="f7:arrow_up_circle_fill"
        iconMd="material:send"
        slot="inner-end"
        onClick={sendMessage}
      />
      {/* <MessagebarAttachments>
        {attachments.map((image, index) => (
          <MessagebarAttachment
            key={index}
            image={image}
            onAttachmentDelete={() => deleteAttachment(image)}
          />
        ))}
      </MessagebarAttachments>
      <MessagebarSheet>
        {images.map((image, index) => (
          <MessagebarSheetImage
            key={index}
            image={image}
            checked={attachments.indexOf(image) >= 0}
            onChange={handleAttachment}
          />
        ))}
      </MessagebarSheet> */}
    </Messagebar>
  );
}
