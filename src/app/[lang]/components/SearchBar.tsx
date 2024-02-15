"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Locale } from "../../../../i18.config";

const SearchBar = ({
  lang,
}: {
  lang: Locale;
}) => {
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
        placeholder={lang === "en" ? "Search posts..." : "ابحث في المقالات..."}
        className="p-2 border border-gray-300 rounded text-black" 
      />
      <button type="submit" className="p-2 border border-gray-300 rounded">
        {lang === "en" ? "Search" : "البحث"}
      </button>
    </form>
  );
};

export default SearchBar;
