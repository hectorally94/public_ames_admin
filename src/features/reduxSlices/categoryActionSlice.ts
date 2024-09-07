// categoryActionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryAction } from '../api/categoryActionApiSlice';

interface CategoryActionState {
  actionType: string | null;
  payload: CategoryAction | null;
}

const initialState: CategoryActionState = {
  actionType: null,
  payload: null,
};

const categoryActionSlice = createSlice({
  name: 'categoryAction',
  initialState,
  reducers: {
    setCategoryActionType: (state, action: PayloadAction<string>) => {
      state.actionType = action.payload;
    },
    setCategoryActionPayload: (state, action: PayloadAction<CategoryAction>) => {
      state.payload = action.payload;
    },
    clearCategoryAction: (state) => {
      state.actionType = null;
      state.payload = null;
    },
  },
});

export const { setCategoryActionType, setCategoryActionPayload, clearCategoryAction } = categoryActionSlice.actions;
export default categoryActionSlice.reducer;
