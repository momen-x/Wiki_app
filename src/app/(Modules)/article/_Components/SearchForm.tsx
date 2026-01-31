"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";
import { Button } from "@/app/_Components/ui/button";

interface SearchFormProps {
  initialSearch?: string;
}

export default function SearchForm({ initialSearch = "" }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(initialSearch);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
      params.set('page', '1'); // Reset to page 1 on new search
    } else {
      params.delete('search');
    }
    
    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-6">
      <div className="flex gap-2">
        <input
          value={searchInput}
          type="search"
          name="search"
          id="search"
          placeholder="Search articles"
          title="Search articles"
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button
          type="submit"
          className="px-6 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors cursor-pointer"
        >
          Search
        </Button>
      </div>
    </form>
  );
}