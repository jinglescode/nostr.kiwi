import ListFeedPage from "@/components/list/ListFeedPage";
export default function Page(props: any) {
  const { id, userid, f7route } = props;

  let _userid = userid;
  let _kind = 30000;
  if (userid && userid.includes(":")) {
    _userid = userid.split(":")[0];
    _kind = parseInt(userid.split(":")[1]);
  }

  return <ListFeedPage id={id} pk={_userid} kind={_kind} />;
}
