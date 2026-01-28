import Link from "next/link";
import Custom404 from "../_Components/not-found";
import { domain_name } from "@/app/utils/Domain";

interface IMatchData {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

interface SearchPageProps {
  searchParams: Promise<{ searchText?: string }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { searchText } = await searchParams;

  // Validate search text exists
  if (!searchText) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <p>Please enter a search term</p>
      </div>
    );
  }

  try {
    const response = await fetch(
      `${domain_name}/api/articles/search?searchText=${encodeURIComponent(searchText)}`,
    );

    if (!response.ok) {
      return <Custom404 />;
    }

    const data = await response.json();
    const articles: IMatchData[] = data.message || [];

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Search Results for:{" "}
          <span className="text-blue-600">{searchText}</span>
        </h1>

        {articles.length > 0 ? (
          <div className="space-y-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {article.title}
                  </h2>
                  <div className="flex items-center text-gray-500 mb-4">
                    <span>Posted by User {article.userId}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="prose max-w-none text-gray-700">
                    <p className="text-lg leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                  <Link
                    href={`/article/${article.id}`}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No articles found matching your search.
          </p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Search failed:", error);
    return <Custom404 />;
  }
};

export default SearchPage;