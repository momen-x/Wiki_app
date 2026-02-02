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
      {userData.message.articles && (
        <ArticlesList articles={userData.message.articles} />
      )}
    </div>
  );
};

export default UserProfile;
