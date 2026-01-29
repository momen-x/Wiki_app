import UserPsrofle from "@/app/(Modules)/(user)/userProfile/_Components/UserPsrofle";

interface IParams {
  params: Promise<{ id: string }>;
}

const UserProfilePage = async ({ params }: IParams) => {
  let id = (await params).id;

  return (
    <>
      <UserPsrofle id={id} />
    </>
  );
};
export default UserProfilePage;
