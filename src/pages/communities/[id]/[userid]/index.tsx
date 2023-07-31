import CommunityPage from "@/components/community/page";

export default function Page(props: any) {
  const { id, userid, f7route } = props;
  return <CommunityPage id={`34550:${userid}:${id}`} />;
}
