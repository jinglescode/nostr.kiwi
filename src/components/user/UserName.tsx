import { useUserProfile } from "@/libs/ndk/hooks/useUserProfile";

export default function UserName({ pk }: { pk: string }) {
  const { data: user } = useUserProfile(pk);
  return <>{user && user.displayName}</>;
}
