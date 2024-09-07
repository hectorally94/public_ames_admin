// postBlogSlice.ts
import { createSlice, PayloadAction,  } from '@reduxjs/toolkit';
import { BlogDto } from '../api/blogsApiSlice';
  
interface postBlogState {
  selectedBlog: BlogDto | null;


}

const initialState: postBlogState = {
  selectedBlog: null,
};

const postBlogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setSelectedBlog: (state, Blog: PayloadAction<BlogDto>) => {
      state.selectedBlog = Blog.payload;
    },
   
    
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
});

export const { setSelectedBlog, clearSelectedBlog } = postBlogSlice.actions;
export default postBlogSlice.reducer;