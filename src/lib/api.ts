// import 'server-only'
import { Post } from "@/types";
import type { Locale } from "../../i18.config";

const posts = {
  en: () => import("../data/posts_en.json").then((module) => module.default),
  ar: () => import("../data/posts_ar.json").then((module) => module.default),
};

export const getPosts = async (
  locale: Locale,
  searchQuery: string = "",
  category: string = "",
  tag: string = "",
): Promise<Post[]> => {
  const allPosts = await posts[locale]();
  console.log(tag)
  if (!searchQuery && !category &&  !tag) {
    return allPosts;
  }

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearchQuery = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = category
      ? post.category.toLowerCase() === category.toLowerCase()
      : true;

      const matchesTags = tag
      ? post.tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase())
      : true;

    return matchesSearchQuery && matchesCategory && matchesTags;
  });

  return filteredPosts;
};

export const getPostById = async (
  id: string,
  locale: Locale
): Promise<Post | undefined> => {
  const allPosts = await posts[locale]();
  return allPosts.find((post) => post.id.toString() === id);
};

export const getCategories = async (locale: Locale): Promise<string[]> => {
  const allPosts = await posts[locale]();
  return Array.from(
    new Set(allPosts.map((post) => post.category.toLowerCase()))
  );
}

export const getTags = async (locale: Locale): Promise<string[]> => {
  const allPosts = await posts[locale]();
  const tags = allPosts.flatMap((post) => post.tags);
  return Array.from(new Set(tags.map((tag) => tag.toLowerCase())));
}

