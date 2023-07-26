import { nip19 } from "nostr-tools";
import { getPublicKeys } from "./getPublicKeys";

export function encodeNote(eventId: string) {
  return nip19.noteEncode(eventId);
}

export function getTagsFromContent(content: string) {
  const notesTags = getNoteTags(content);
  const usersTags = getUserTags(content);

  return [...notesTags, ...usersTags];
}

function getNoteTags(content: string) {
  let re = /(nostr:note1\w+|nostr:nevent1\w+|@note1\w+|nevent1\w+)/g;
  let m;
  let results = [];

  do {
    m = re.exec(content);
    if (m) {
      results.push(m[1]);
    }
  } while (m);

  const ids = results
    .map((text) => {
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
      } catch (e) {}

      return hex;
    })
    .filter((id) => id !== "");

  const tags = ids.map((id) => ["e", id]);

  return tags;
}

function getUserTags(content: string) {
  let re = /(nostr:npub1\w+|nostr:nprofile1\w+|@npub1\w+|@nprofile1\w+)/g;
  let m;
  let results = [];

  do {
    m = re.exec(content);
    if (m) {
      results.push(m[1]);
    }
  } while (m);

  const ids = results
    .map((text) => {
      let hexOrNpub = text;

      const regex_npub1ornprofile1 = /(nostr:npub1\w+|nostr:nprofile1\w+)/;
      if (regex_npub1ornprofile1.test(hexOrNpub)) {
        const [_, val] = hexOrNpub.split(":");
        hexOrNpub = val;
      }
      const regex_npub1ornprofile2 = /(@npub1\w+|@nprofile1\w+)/;
      if (regex_npub1ornprofile2.test(hexOrNpub)) {
        const [_, val] = hexOrNpub.split("@");
        hexOrNpub = val;
      }

      if (hexOrNpub.includes("nprofile1")) {
        const profileId = nip19.decode(hexOrNpub).data as nip19.ProfilePointer;
        hexOrNpub = profileId.pubkey;
      }

      const pks = getPublicKeys(hexOrNpub);

      return pks.pk;
    })
    .filter((id) => id !== "");

  const tags = ids.map((id) => ["p", id]);
  return tags;
}
