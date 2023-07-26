import { TNote } from "@/types/Note";
import NoteBlock from "../NoteBlock";
import { usePersistSettingsStore } from "@/libs/zustand/persistSettingsStore";

export default function NoteReplies({
  replies,
}: {
  replies: TNote[] | undefined;
}) {
  const spamFilters = usePersistSettingsStore((state) => state.spamFilters);

  return (
    <>
      {replies && (
        <div className="ml-2">
          {replies
            .filter((reply) => {
              if (
                spamFilters.some(function (v) {
                  return reply.content.toLowerCase().indexOf(v) >= 0;
                })
              ) {
                return false;
              }
              return true;
            })
            .map((reply, i) => (
              <div key={i}>
                <NoteBlock note={reply} canReply={true} />
                {reply.replies && reply.replies.length > 0 && (
                  <NoteReplies replies={reply.replies} />
                )}
              </div>
            ))}
        </div>
      )}
    </>
  );
}
