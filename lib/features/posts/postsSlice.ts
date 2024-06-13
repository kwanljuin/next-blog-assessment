import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export type Post = {
  id: string;
  title: string;
  body: string;
};

type PostsState = {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null | undefined;
};

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/posts`;

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, body }: { title: string; body: string }) => {
    const payload = {
      id: nanoid(), // generate a unique id for the post
      title,
      body,
    };
    const response = await axios.post(API_URL, payload);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, title, body }: Post) => {
    const payload = { title, body };
    const response = await axios.put(`${API_URL}/${id}`, payload);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetchPostById
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // createPost
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // updatePost
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.posts[index] = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // deletePost
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
