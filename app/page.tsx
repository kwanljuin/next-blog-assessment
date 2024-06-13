"use client";
import { useEffect } from "react";
import Link from "next/link";
import { fetchPosts } from "@/lib/features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/features/posts/postsSlice";
import type { RootState } from "@/lib/store";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state: RootState) => state.posts.posts);
  const loading = useAppSelector((state: RootState) => state.posts.loading);
  const error = useAppSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container px-4 pt-10 pb-4">
      <div className="mx-auto w-16 h-16 rounded-full border-4 border-amber-950 flex justify-center items-center">
        <span className="text-4xl">🌲</span>
      </div>
      <h1 className="text-center text-2xl font-bold mb-0">Tree Hole</h1>
      <p className="text-center mb-6">
        This is where you can share your secrets
      </p>
      <Link href="/posts/new">
        <Button
          variant="outline"
          className="mx-auto w-full border-green-700 text-green-700 hover:text-green-500 hover:border-green-500"
        >
          + New
        </Button>
      </Link>
      <h6 className="mt-4 font-bold">✨ secrets:</h6>
      {loading && (
        <div className="space-y-2 text-center my-4">
          <Skeleton className="h-4 w-full mx-auto" />
          <Skeleton className="h-4 w-full mx-auto" />
          <Skeleton className="h-4 w-full mx-auto" />
        </div>
      )}
      {error && (
        <div className="my-4 text-center border border-red-600 rounded py-2">
          <h3 className="text-red-500">Error</h3>
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <ul>
          {posts.map((post: Post) => (
            <li key={post.id} className="mb-2 border rounded border-gray-400">
              <Link
                href={`/posts/${post.id}`}
                className="text-grey-500 p-2 flex justify-center"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
