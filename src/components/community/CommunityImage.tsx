import Image from "@/components/common/Image";
import { useCommunity } from "@/libs/ndk/hooks/useCommunity";
import { sessionCommunityStore } from "@/libs/zustand/sessionCommunityStore";
import { Link } from "framework7-react";

export default function CommunityImage({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const { data: community } = useCommunity(id);
  const setCommunityPanel = sessionCommunityStore(
    (state) => state.setCommunityPanel
  );

  return (
    <Link href={`/communities/${community?.id}`}>
      {/* <div
      onClick={() =>
        setCommunityPanel({ page: { communityId: community?.id } })
      }
    > */}
      <Image
        src={community && community.image ? community.image : ""}
        className={
          className
            ? className
            : "h-8 w-8 rounded-full object-cover border-2 border-[#7E81FF]"
        }
        generateAvatarWithChar={community && community.name.substring(0, 1)}
        alt="community logo"
      />
      {/* </div> */}
    </Link>
  );
}
