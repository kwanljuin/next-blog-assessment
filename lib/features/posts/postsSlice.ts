import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: string;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (
      state,
      action: PayloadAction<{ title: string; body: string }>
    ) => {
      state.posts.push({
        id: nanoid(),
        title: action.payload.title,
        body: action.payload.body,
      });
    },
    updatePost: (
      state,
      action: PayloadAction<{ id: string; title: string; body: string }>
    ) => {
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = {
          ...state.posts[postIndex],
          title: action.payload.title,
          body: action.payload.body,
        };
      }
    },
    removePost: (state, action: PayloadAction<{ id: string }>) => {
      state.posts = state.posts.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const { addPost, updatePost, removePost } = postsSlice.actions;
export default postsSlice.reducer;
