import { useUserProfile } from "@/libs/ndk/hooks/useUserProfile";
import Image from "@/components/common/Image";
import { sessionUserStore } from "@/libs/zustand/sessionUserStore";
import { Link } from "framework7-react";

export default function UserImage({
  pk,
  className,
  onClickProfile = true,
}: {
  pk?: string;
  className?: string;
  onClickProfile?: boolean;
}) {
  const { data: user } = useUserProfile(pk);
  const setUserPanel = sessionUserStore((state) => state.setUserPanel);

  return (
    <Link href={`/user/${user?.pk}`}>
      <Image
        src={user && user.image ? user.image : ""}
        className={
          className
            ? className
            : "h-8 w-8 rounded-full object-cover border-2 border-[#7E81FF]"
        }
        generateAvatarWithChar={user ? user.displayName.substring(0, 1) : "?"}
        alt="user avatar"
      />
    </Link>
  );
}
