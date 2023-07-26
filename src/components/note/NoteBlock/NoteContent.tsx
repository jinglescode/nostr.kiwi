import { nip19 } from "nostr-tools";

import { Icon, Link } from "framework7-react";
import { useSessionStore } from "@/libs/zustand/session";
import NoteNpubLink from "./NoteNpubLink";
import { TNote } from "@/types/Note";
import { getPublicKeys } from "@/libs/ndk/utils/getPublicKeys";
import Image from "../../common/Image";
import NoteBlock from ".";

const customHashtags: { [tag: string]: JSX.Element } = {
  // "#coffeechain": <span className="text-amber-700">#coffeechain☕️</span>,
};

export default function NoteContent({ note }: { note: TNote }) {
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);

  function makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const cleanText = (text: string) => {
    // remove trailing whitespaces
    text = text.trim();

    // remove unnecessary whitespaces
    // text = text.replace(/\s{2,}/, " ");

    // remove unnecessary linebreak
    // text = text.replace(/(\r\n|\r|\n){2,}/, "$1\n");
    // text = text.replace(/\n+/g, "\n")
    return text;
  };

  const breakIntoList = (text: string) => {
    // let _text: string = JSON.parse(JSON.stringify(text));
    let output = text.split(" ").map((block, i) => {
      return `${block} `;
    });
    return output;
  };

  const outDisplay = (listContent: (string | JSX.Element)[]) => {
    return listContent.flat();
  };

  const addlineBreaks = (listContent: string[]) => {
    const regex = /(\r\n|\r|\n)/;

    let output: (string | JSX.Element)[] = [];
    listContent.forEach((text, i) => {
      text.split(regex).map((block, i) => {
        if (block.match(regex)) {
          output.push(
            <br
              key={`${Math.random().toString()}${note.id}break${makeid(5)}`}
            />
          );
        } else {
          output.push(block);
        }
      });
    });

    return output;
  };

  const parser = (
    listContent: (string | JSX.Element)[],
    regex: RegExp,
    outputElement: ({
      text,
      i,
    }: {
      text: string;
      i: number;
    }) => JSX.Element | string
  ) => {
    let output: (string | JSX.Element)[] = [];

    listContent.forEach((item, i) => {
      if (typeof item === "string") {
        let blocks = item.split(regex);

        blocks.forEach((block, i) => {
          const isValid = regex.test(block);

          if (isValid) {
            output.push(outputElement({ text: block, i }));
          } else {
            output.push(block);
          }
        });
      } else {
        output.push(item);
      }
    });

    return output;
  };

  const urlify = (listContent: (string | JSX.Element)[]) => {
    const regexIsUrl =
      /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;

    let output: (string | JSX.Element)[] = [];
    listContent.forEach((text, i) => {
      let _output = text;

      if (typeof text === "string") {
        const isURL = regexIsUrl.test(text.toString());

        if (isURL) {
          /**
           * image
           */
          const isImage =
            text.includes(".jpg") ||
            text.includes(".jpeg") ||
            text.includes(".webp") ||
            text.includes(".png") ||
            text.includes(".gif") ||
            text.includes("format=png");

          if (isImage) {
            _output = (
              <>
                <Image
                  src={text}
                  key={`${Math.random().toString()}${note.id}image${text}${i}`}
                />
              </>
            );
          }

          /**
           * youtube
           */
          const youtubeRegex =
            /(?:https?:\/\/)?(?:www|m\.)?(?:youtu\.be\/|youtube\.com\/(?:live\/|shorts\/|embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/;

          if (youtubeRegex.test(text)) {
            const youtubeId = (youtubeRegex.test(text) && RegExp.$1) as string;
            _output = (
              // <iframe
              //   className="w-full aspect-video my-2"
              //   src={`https://www.youtube.com/embed/${youtubeId}`}
              //   key={`${Math.random().toString()}${
              //     note.id
              //   }youtube${youtubeId}${i}`}
              //   // allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              //   allow='encrypted-media'
              //   allowFullScreen
              // ></iframe>
              // <YouTube
              //   className="w-full aspect-video my-2"
              //   videoId="2g811Eo7K8U"
              //   opts={
              //     {
              //       // height: "390",
              //       // width: "640",
              //     }
              //   }
              // />
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <img
                  src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                  className="w-full aspect-video my-2"
                />
                <div className="absolute w-full h-full top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                  <Link
                    href={`https://www.youtube.com/watch?v=${youtubeId}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    external
                  >
                    <Icon
                      f7="play_circle_fill"
                      size="60px"
                      className="text-[#7E81FF]"
                    ></Icon>
                  </Link>
                </div>
              </div>
            );
          }

          /**
           * spotify
           */
          const spotifyRegex =
            /open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/;
          if (spotifyRegex.test(text)) {
            const convertedUrl = text.replace(
              /\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/,
              "/embed/$1/$2"
            );

            _output = (
              <iframe
                key={`${Math.random().toString()}${
                  note.id
                }spotify${convertedUrl}${i}`}
                src={`${convertedUrl}`}
                className="my-2"
                width="100%"
                height="352"
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            );
          }

          // write a songlink regex, example of a songlink: https:\/\/song.link\/s\/7iKjlyaN1ve4FHQu42WFFg"
          const songlinkRegex = /https:\/\/song.link\/s\/([a-zA-Z0-9]+)/;
          if (songlinkRegex.test(text)) {
            const _id = text.replace(
              /\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/,
              "/embed/$1/$2"
            );
            _output = (
              <iframe
                key={`${Math.random().toString()}${note.id}songlink${_id}${i}`}
                className="my-2"
                width="100%"
                height="52"
                src={`https://odesli.co/embed/?url=${text}&theme=light`}
                sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"
                allow="clipboard-read; clipboard-write"
              ></iframe>
            );
          }

          // if url ending with .mp4
          const isVideo =
            text.includes(".mp4") ||
            text.includes(".mov") ||
            text.includes(".webm") ||
            text.includes("ogg");

          if (isVideo) {
            _output = (
              <video
                key={`${Math.random().toString()}${note.id}video${text}${i}`}
                width="100%"
                controls
                className="w-full aspect-video my-2"
                muted
              >
                <source src={text} />
              </video>
            );
          }

          /**
           * is link
           */
          if (typeof _output === "string") {
            _output = (
              // <Link
              //   // className="text-white truncate block"
              //   //@ts-ignore
              //   href={text}
              //   key={`${Math.random().toString()}${note.id}text${text}${i}`}
              //   target="_blank"
              // >
              //   {text}
              // </Link>
              <Link
                key={`${Math.random().toString()}${note.id}text${text}${i}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setAppActionSheet({
                    url: text,
                  });
                }}
              >
                {text}
              </Link>
            );
          }
        }
      }
      output.push(_output);
    });

    return output;
  };

  const parseHashtags = (listContent: (string | JSX.Element)[]) => {
    const regex = /(#\w+)/;

    return parser(
      listContent,
      regex,
      ({ text, i }: { text: string; i: number }) => {
        return (
          <Link
            // className="text-black dark:text-white"
            //@ts-ignore
            // href={`/topics/${text.slice(1)}`}
            key={`${Math.random().toString()}${note.id}hash${text}${i}`}
            onClick={(e) => {
              setAppActionSheet({ tag: text.slice(1) });
              e.stopPropagation();
            }}
          >
            {text in customHashtags ? customHashtags[text] : text}
          </Link>
        );
      }
    );
  };

  const parseNpubLinks = (listContent: (string | JSX.Element)[]) => {
    const regex = /(nostr:npub1\w+|nostr:nprofile1\w+|#\[\d\])/;

    return parser(
      listContent,
      regex,
      ({ text, i }: { text: string; i: number }) => {
        let hexOrNpub = text;

        const regex_npub1ornprofile1 = /(nostr:npub1\w+|nostr:nprofile1\w+)/;
        if (regex_npub1ornprofile1.test(hexOrNpub)) {
          const [_, npubOrNprofile1] = hexOrNpub.split(":");
          hexOrNpub = npubOrNprofile1;
        }

        if (hexOrNpub.includes("nprofile1")) {
          const profileId = nip19.decode(hexOrNpub)
            .data as nip19.ProfilePointer;
          hexOrNpub = profileId.pubkey;
        }

        const regex_hashnumber = /#\[\d\]/;
        if (regex_hashnumber.test(hexOrNpub)) {
          const regexHash = /#\[(\d+)\]/;
          let index = (regexHash.test(hexOrNpub) && RegExp.$1) as string;
          if (index) {
            let _index = parseInt(index, 10);
            hexOrNpub = note.tags[_index][1];
          }
        }

        let pks = undefined;
        try {
          pks = getPublicKeys(hexOrNpub);
        } catch (e) {
          // console.log("error", note.id, hexOrNpub);
        }

        if (pks == undefined) return <></>;

        return (
          <NoteNpubLink hexOrNpub={hexOrNpub} key={`${Math.random()}publink`} />
        );
      }
    );
  };

  const parseNoteLinks = (listContent: (string | JSX.Element)[]) => {
    const regex = /(nostr:note1\w+|nostr:nevent1\w+|@note1\w+|nevent1\w+)/;

    return parser(
      listContent,
      regex,
      ({ text, i }: { text: string; i: number }) => {
        let id = "";
        if (text.includes("@note1")) {
          const [_, _id] = text.split("@");
          id = _id;
        } else if (text.includes("nostr:")) {
          const [_, _id] = text.split(":");
          id = _id;
        } else if (text.includes("nevent1")) {
          id = text;
        }

        let hex = "";
        try {
          const eventId = nip19.decode(id).data as string | nip19.EventPointer;
          hex = typeof eventId === "string" ? eventId : eventId.id;
          // noteId = nip19.noteEncode(hex);
        } catch (e) {}

        if (hex == "") return <></>;

        return (
          <div
            className="mt-2 border border-neutral-800"
            key={`${Math.random()}notelinks`}
          >
            <NoteBlock
              eventId={hex}
              hideActionBar={true}
              key={`${Math.random().toString()}${note.id}note${hex}${i}`}
            />
          </div>
        );
      }
    );
  };

  return (
    <div className="break-word overflow-x-clip">
      {outDisplay(
        parseNoteLinks(
          parseNpubLinks(
            parseHashtags(
              urlify(addlineBreaks(breakIntoList(cleanText(note.content))))
            )
          )
        )
      )}
    </div>
  );
}
