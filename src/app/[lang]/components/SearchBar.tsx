"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(searchTerm);
      }}
      className="flex gap-4 items-center justify-center mt-5"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search posts..."
        className="p-2 border border-gray-300 rounded text-black" 
      />
      <button type="submit" className="p-2 border border-gray-300 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
