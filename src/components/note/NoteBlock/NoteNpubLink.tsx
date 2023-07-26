import { useUserProfile } from "@/libs/ndk/hooks/useUserProfile";
import { useSessionStore } from "@/libs/zustand/session";
import { Link } from "framework7-react";

export default function NoteNpubLink({ hexOrNpub }: { hexOrNpub: string }) {
  const setAppActionSheet = useSessionStore((state) => state.setAppActionSheet);

  const { data: user } = useUserProfile(hexOrNpub);

  if (user === undefined) return <></>;

  return (
    <Link
      key={`${user.npub}user`}
      onClick={(e) => {
        e.stopPropagation();
        setAppActionSheet({
          pkOrNpub: user.npub,
        });
      }}
    >
      @{user.displayName}
    </Link>
  );
}
