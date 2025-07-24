"use client";
import Link from "next/link";
import ArticlesErrorPage from "../article/error";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface IArticleData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const ListOfArticles = () => {
  const [searchInput, setSearchInput] = useState("");
  const [articles, setArticles] = useState<IArticleData[]>([]);
  const router = useRouter();

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          return <ArticlesErrorPage />;
        }
        const articlesData: IArticleData[] = await response.json();
        setArticles(articlesData);
      } catch (err) {
        return <ArticlesErrorPage />;
      } 
    };

    fetchArticles();
  }, []);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      // Navigate to search results page with the search query
      router.push(`/article/search`);
    }
  };

  // Function to shorten the body text
  const shortenText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

 

  const articlesList = articles.slice(0, 6).map((arti) => (
    <div
      key={arti.id}
      className="max-w-4xl mx-auto mb-6 p-6 bg-white rounded-lg shadow-md"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2">{arti.title}</h3>
      <p className="text-gray-600 mb-4">{shortenText(arti.body)}</p>
      <Link
        href={`/article/${arti.id}`}
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Read More
      </Link>
    </div>
  ));

  return (
    <>
      <form onSubmit={formSubmitHandler} className="max-w-4xl mx-auto mb-6">
        <input
          value={searchInput}
          type="search"
          name="search"
          id="search"
          placeholder="Search articles"
          title="Search articles"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </form>
      <div className="space-y-6">
        {articlesList}
        <div className="max-w-4xl mx-auto flex justify-center space-x-2 mt-8">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            Prev
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded-md ${
                page === 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ListOfArticles;
