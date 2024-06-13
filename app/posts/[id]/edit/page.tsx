"use client";
import { useEffect } from "react";
import { ChevronLeftIcon } from "lucide-react";
import type { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPostById } from "@/lib/features/posts/postsSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import PostForm from "../../_components/PostForm";

const EditPostPage = ({ params: { id } }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state: RootState) => state.posts.currentPost);
  const loading = useAppSelector((state: RootState) => state.posts.loading);
  const error = useAppSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-1 mb-4">
        <Button variant="ghost" onClick={() => history.back()}>
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Post</h1>
      </div>
      {loading && (
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="pt-8">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      )}
      {error && (
        <div className="my-4 text-center border border-red-600 rounded py-2">
          <h3 className="text-red-500">Error</h3>
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {!loading && !error && post && <PostForm post={post} />}
    </div>
  );
};

export default EditPostPage;
