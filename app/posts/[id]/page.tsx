"use client";
import Link from "next/link";
import { useEffect } from "react";
import { ChevronLeftIcon, Edit, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPostById, deletePost } from "@/lib/features/posts/postsSlice";
import type { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorCard } from "@/components/ErrorCard";

const PostDetailsPage = ({ params: { id } }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state: RootState) => state.posts.currentPost);
  const loading = useAppSelector((state: RootState) => state.posts.loading);
  const error = useAppSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await dispatch(deletePost(id));
      window.location.href = "/";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Button
        variant="ghost"
        className="pl-0 mb-2"
        onClick={() => history.back()}
      >
        <ChevronLeftIcon className="h-6 w-6" /> Home
      </Button>
      {loading && (
        <div className="space-y-2">
          <Skeleton className="h-[125px] w-full rounded-xl" />
        </div>
      )}
      {error && <ErrorCard errorMessage={error} />}
      {!loading && !error && post && (
        <div className="border rounded-xl border-slate-500 pl-4 p-3">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <div>
              <Link href={`/posts/${post.id}/edit`}>
                <Button
                  variant="ghost"
                  className="mx-auto mr-2 border-green-700 text-green-700 "
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleDelete}
                className="mx-auto border-red-700 text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="mb-4">{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
