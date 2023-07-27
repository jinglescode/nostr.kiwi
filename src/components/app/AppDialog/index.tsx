import CommunityRepostDialog from "./CommunityRepost";
import NoteReactionDialog from "./NoteReaction";
import TagAddToListDialog from "./TagAddToList";
import UserAddToListDialog from "./UserAddToList";
import ZapCustomNWCDialog from "./ZapCustomNWC";
import ZapNWCUrlDialog from "./ZapNWCUrl";
import ZapWeblnUrlDialog from "./ZapWeblnUrl";

export default function AppDialog() {
  return (
    <>
      <CommunityRepostDialog />
      <NoteReactionDialog />
      <ZapNWCUrlDialog />
      <ZapWeblnUrlDialog />
      <ZapCustomNWCDialog />
      <UserAddToListDialog />
      <TagAddToListDialog />
    </>
  );
}
