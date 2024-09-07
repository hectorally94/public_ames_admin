// imgIdSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParticipableDtoState {
  actionType: string | null;
  payload: any | null;
}

const initialState: ParticipableDtoState = {
  actionType: null,
  payload: null,
};

const imgIdSlice = createSlice({
  name: 'imgIdSlice',
  initialState,
  reducers: {
    setimgIdSlice: (state, action: PayloadAction<any>) => {
      state.actionType = action.payload;
    },
    setimgIdSlicePayload: (state, action: PayloadAction<any>) => {
      state.payload = action.payload;
    },
    clearimgIdSlice: (state) => {
      state.actionType = null;
      state.payload = null;
    },
  },
});

export const { setimgIdSlice, setimgIdSlicePayload, clearimgIdSlice } = imgIdSlice.actions;
export default imgIdSlice.reducer;
