import { useNDK } from "@/libs/ndk";
import { useCommunityChat } from "@/libs/ndk/hooks/useCommunityChat";
import { usePersistUserStore } from "@/libs/zustand/persistUserStore";
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
import UserName from "../user/UserName";

type Message = {
  type: "sent" | "received";
  text?: string;
  image?: string;
  name: string;
  avatar?: string;
  isTitle?: boolean;
};

export default function Chat({ community }: { community: TCommunity }) {
  const { signer } = useNDK();
  const [messageText, setMessageText] = useState("");

  const user = usePersistUserStore((state) => state.user);

  const { data: chat } = useCommunityChat(community.id);

  const messagesData: Message[] = chat
    ? chat.map((message) => {
        return {
          type: message.author == user?.pk ? "sent" : "received",
          text: message.content,
          name: message.author,
        };
      })
    : [];

  const isFirstMessage = (message: Message, index: number) => {
    const previousMessage = messagesData[index - 1];
    if (message.name == user?.pk) return false;

    if (message.isTitle) return false;
    if (
      !previousMessage ||
      previousMessage.type !== message.type ||
      previousMessage.name !== message.name
    )
      return true;
    return false;
  };
  const isLastMessage = (message: Message, index: number) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (
      !nextMessage ||
      nextMessage.type !== message.type ||
      nextMessage.name !== message.name
    )
      return true;
    return false;
  };
  const isTailMessage = (message: Message, index: number) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (
      !nextMessage ||
      nextMessage.type !== message.type ||
      nextMessage.name !== message.name
    )
      return true;
    return false;
  };

  async function sendMessage() {
    // const messagesToSend: Message[] = [];

    // const text = messageText.replace(/\n/g, "<br>").trim();

    // if (text.length) {
    //   messagesToSend.push({
    //     type: "sent",
    //     text: text,
    //   });
    // }
    // if (messagesToSend.length === 0) {
    //   return;
    // }

    // setMessagesData([...messagesData, ...messagesToSend]);
    setMessageText("");
  }

  return (
    <Page>
      <Messages>
        {/* <MessagesTitle>
          <b>Sunday, Feb 9,</b> 12:58
        </MessagesTitle> */}

        {messagesData.map((message, index) => (
          <Message
            key={index}
            type={message.type}
            image={message.image}
            avatar={message.avatar}
            first={isFirstMessage(message, index)}
            last={isLastMessage(message, index)}
            tail={isTailMessage(message, index)}
          >
            <div slot="name">
              <UserName pk={message.name} />
            </div>
            {message.text && (
              <span
                slot="text"
                dangerouslySetInnerHTML={{ __html: message.text }}
              />
            )}
          </Message>
        ))}
      </Messages>

      <Messagebar
        className="pb-4"
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
    </Page>
  );
}
