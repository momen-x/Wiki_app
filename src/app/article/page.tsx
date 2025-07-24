import ListOfArticles from "../components/ListOfArticales";

const ArticlePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Search for article</h1>
        <ListOfArticles />
      </div>
    </div>
  );
};

export default ArticlePage;