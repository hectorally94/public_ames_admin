// typeActionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeAction } from '../api/typeActionsApiSlice'; // Adjust the import path as necessary

interface TypeActionState {
  actionType: string | null;
  payload: TypeAction | null;
}

const initialState: TypeActionState = {
  actionType: null,
  payload: null,
};

const typeActionSlice = createSlice({
  name: 'typeAction',
  initialState,
  reducers: {
    setActionType: (state, action: PayloadAction<string>) => {
      state.actionType = action.payload;
    },
    setActionPayload: (state, action: PayloadAction<TypeAction>) => {
      state.payload = action.payload;
    },
    clearTypeAction: (state) => {
      state.actionType = null;
      state.payload = null;
    },
  },
});

export const { setActionType, setActionPayload, clearTypeAction } = typeActionSlice.actions;
export default typeActionSlice.reducer;
