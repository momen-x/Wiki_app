import Link from "next/link";

interface IArticleData {
  userId: number;
  id: number;
  title: string;
  description: string;
}

interface ArticlesListProps {
  articles: IArticleData[];
}

function shortenText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  if (articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <p className="text-gray-600">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <div
          key={article.id}
          className="max-w-4xl mx-auto mb-6 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-700"
        >
          <h3 className="text-xl font-bold mb-2">{article.title}</h3>
          <p className="mb-4">{shortenText(article.description)}</p>
          <Link
            href={`/article/${article.id}`}
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}