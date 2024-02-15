"use client";

import { useEffect, useState } from "react";
import { Post as PostType } from "@/types"; 
import { getPostById } from "../../../../lib/api";
import { Locale } from "../../../../../i18.config";
import Link from "next/link";

const PostDetails = ({
  params,
}: {
  params: {
    id: string;
    lang: Locale;
  };
}) => {
  const { id, lang } = params;
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const fetchedPost = await getPostById(id.toString(), lang);
      if (!fetchedPost) return;
      setPost(fetchedPost);
    };

    fetchPost();
  }, [id, lang]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <article className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="font-bold text-2xl mb-2 text-gray-800">
            {post.title}
          </h1>
          <p className="text-gray-700">{post.content}</p>
          <div className="mt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {post.category}
            </span>
            {post.tags &&
              post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
          </div>
          <Link
            href="/"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {lang === "en" ? "Back to Home" : "العودة إلى الصفحة الرئيسية"}
          </Link>
        </div>
      </article>
    </div>
  );
};

export default PostDetails;
