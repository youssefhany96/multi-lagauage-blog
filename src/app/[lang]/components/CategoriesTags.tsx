"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const CategoriesTags = ({ categories, tags }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategory) {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    if (selectedTag) {
      params.set("tag", selectedTag);
    } else {
      params.delete("tag");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [pathname, replace, searchParams, selectedCategory, selectedTag]);

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div>
        <label
          htmlFor="category-select"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="tag-select"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by Tag:
        </label>
        <select
          id="tag-select"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        >
          <option value="">All tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      {/* <fieldset>
        <legend className="block text-sm font-medium text-gray-700">
          Tags:
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center">
              <input
                id={`tag-${tag}`}
                type="checkbox"
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTags([...selectedTags, tag]);
                  } else {
                    setSelectedTags(selectedTags.filter((t) => t !== tag));
                  }
                }}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`tag-${tag}`}
                className="ml-2 block text-sm text-white"
              >
                {tag}
              </label>
            </div>
          ))}
        </div>
      </fieldset> */}
    </div>
  );
};

export default CategoriesTags;
