import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <UserInfo label="💻 Server component" user={user} />
    </>
  );
};

export default ServerPage;
