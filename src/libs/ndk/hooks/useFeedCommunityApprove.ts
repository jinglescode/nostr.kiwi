import { TNote } from "@/types/Note";
import { useFeedCommunity } from "./useFeedCommunity";
import { TCommunity } from "@/types/Community";
import { useEffect, useState } from "react";

export function useFeedCommunityApprove(community: TCommunity | undefined) {
  const [pendingNotes, setPendingNotes] = useState<TNote[]>([]);

  const { data: allNotes } = useFeedCommunity(
    community?.id,
    community?.moderators,
    true
  );

  const { data: approvedNotes, status } = useFeedCommunity(
    community?.id,
    community?.moderators,
    false
  );

  useEffect(() => {
    if (allNotes == undefined || approvedNotes == undefined) return undefined;

    const approvedEventIds = approvedNotes?.map((e) => e.id);

    const _pendingNotes =
      approvedEventIds &&
      allNotes?.filter(function (e) {
        return !approvedEventIds.includes(e.id);
      });

    console.log(
      9999,
      "useFeedCommunityApprove",
      _pendingNotes ? _pendingNotes.length : 0
    );

    setPendingNotes(_pendingNotes!);
  }, [allNotes, approvedNotes]);

  return { pendingNotes, status };
}
