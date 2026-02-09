import ArticlesList from "@/app/(Modules)/article/_Components/ArticlesList";
import { domain_name } from "@/app/utils/Domain";

interface IParams {
  id: string;
}

const UserProfile = async ({ id }: IParams) => {
  const response = await fetch(`${domain_name}/api/users/${id}`);
  const userData = await response.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-xl  mb-4 w-[60vw] m-auto ">

     the articles are : {"("}{userData.message.articles.length}{")"} Articles 
      </h2>
      {userData.message.articles && (
        <ArticlesList articles={userData.message.articles} />
      )}
    </div>
  );
};

export default UserProfile;
