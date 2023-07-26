import UsersPage from "@/components/users/page";

export default function Page(props: any) {
  const { id, f7route } = props;
  return <UsersPage id={id} />;
}
