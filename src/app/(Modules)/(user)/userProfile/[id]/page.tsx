import UserProfile from "../_Components/UserPsrofle"


interface IParams {
  params: Promise<{ id: string }>;
}

const UserProfilePage = async ({ params }: IParams) => {
  let id = (await params).id;


  return (
    <>
      <UserProfile id={id}  />
    </>
  );
};
export default UserProfilePage;
