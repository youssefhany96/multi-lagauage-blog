
import Image from "next/image";
import { getCategories, getPosts, getTags } from "../../lib/api";
import PostList from "./components/PostList";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { Locale } from "../../../i18.config";
import CategoriesTags from "./components/CategoriesTags";

export default async function Home({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale}, 
  searchParams?: { search?: string; category?: string; tag?: string }
}) {

  const posts = await getPosts(lang, searchParams?.search, searchParams?.category, searchParams?.tag);
  const categories = await getCategories(lang);
  const tags = await getTags(lang);
  
  return (
    <div className="max-w-4xl mx-auto">
      <SearchBar />
      <CategoriesTags categories={categories} tags={tags} />
      <PostList posts={posts} />
    </div>
  );
}


