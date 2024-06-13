"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { Post, createPost, updatePost } from "@/lib/features/posts/postsSlice";
import { Button } from "@/components/ui/button";

type PostFormProps = {
  post: Post;
};

const PostForm = ({ post }: PostFormProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (post != null) {
      await dispatch(updatePost({ id: post.id, title, body }));
      return (window.location.href = `/posts/${post.id}`);
    }

    await dispatch(createPost({ title, body }));
    window.location.href = "/";
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="body">
          Body
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <Button type="submit" className="mx-auto w-full ">
        {post != null ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default PostForm;
