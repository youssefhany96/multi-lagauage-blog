import { Post } from "@/types";
import Link from "next/link";
import { Locale } from "../../../../i18.config";

const PostList = ({ posts, lang }: { posts: Post[]; lang: Locale }) => {
  if (!posts) return null;
  return (
    <div className="max-w-4xl mx-auto">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white shadow-md rounded-lg overflow-hidden my-6"
        >
          <div className="p-6">
            <h2 className="font-bold text-xl mb-2 text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-700">{post.content}</p>
            <div className="mt-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/posts/${post.id}`} passHref>
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {lang === "en" ? "Read More" : "اقرأ المزيد"}
              </button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostList;
