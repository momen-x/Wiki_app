import { cookies } from "next/headers";
import ListOfArticles from "../components/ListOfArticales";
import { verifyTokenForPage } from "../utils/verifyToken";

const ArticlePage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token");
  const payload = verifyTokenForPage(token?.value || "");

  if (!payload) {
    return <div>Unauthorized</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Search for article
        </h1>
        <ListOfArticles
        id={payload?.id}
          />
      </div>
    </div>
  );
  }

export default ArticlePage;
