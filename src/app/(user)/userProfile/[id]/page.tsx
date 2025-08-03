import UserPsrofle from "@/app/components/UserPsrofle";

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
