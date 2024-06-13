"use client";
import { useState } from "react";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useAppDispatch } from "@/lib/hooks";
import { createPost } from "@/lib/features/posts/postsSlice";
import { Button } from "@/components/ui/button";

const CreatePostPage = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createPost({ title, body }));
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-1 mb-4">
        <Button variant="ghost" onClick={() => history.back()}>
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">Create New Post</h1>
      </div>
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
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
