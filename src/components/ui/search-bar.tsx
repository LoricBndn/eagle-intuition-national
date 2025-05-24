"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import posts from "@/data/posts";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({ placeholder = "Search..." }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(posts.map((post) => post.category)));
    setCategories(["All", ...uniqueCategories]);
  }, []);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    const currentQuery = searchParams.get("query");
    if (currentQuery) {
      params.set("query", currentQuery);
    }

    if (category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form className="w-full max-w-lg mx-auto relative" onSubmit={(e) => e.preventDefault()}>
      <div className="flex">
        <label htmlFor="search-dropdown" className="sr-only">
          Search
        </label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200"
        >
          {selectedCategory}
          <svg className="w-2.5 h-2.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute mt-12 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 z-20 cursor-pointer">
            <ul className="py-2 text-sm text-gray-700">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className="cursor-pointer inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
            defaultValue={searchParams.get("query")?.toString() || ""}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
