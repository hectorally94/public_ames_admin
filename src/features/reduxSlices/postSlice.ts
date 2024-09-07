// postSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  ActionDto } from '../api/actionsApiSlice';
 
interface postState {
  selectedAction: ActionDto | null;


}

const initialState: postState = {
  selectedAction: null,
};

const postSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    setSelectedAction: (state, action: PayloadAction<ActionDto>) => {
      state.selectedAction = action.payload;
    },
   
    
    clearSelectedAction: (state) => {
      state.selectedAction = null;
    },
  },
});

export const { setSelectedAction, clearSelectedAction } = postSlice.actions;
export default postSlice.reducer;