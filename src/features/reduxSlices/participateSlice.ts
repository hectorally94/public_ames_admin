// participateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParticipableDto } from '../api/participablesApiSlice';

interface ParticipableDtoState {
  actionType: string | null;
  payload: ParticipableDto | null;
}

const initialState: ParticipableDtoState = {
  actionType: null,
  payload: null,
};

const participateSlice = createSlice({
  name: 'datapassOne',
  initialState,
  reducers: {
    setDatapassOne: (state, action: PayloadAction<string>) => {
      state.actionType = action.payload;
    },
    setDatapassOnePayload: (state, action: PayloadAction<ParticipableDto>) => {
      state.payload = action.payload;
    },
    clearDatapassOne: (state) => {
      state.actionType = null;
      state.payload = null;
    },
  },
});

export const { setDatapassOne, setDatapassOnePayload, clearDatapassOne } = participateSlice.actions;
export default participateSlice.reducer;
