// datapassTwo.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WelcomesDto } from '../api/welcomesApiSlice';

interface ParticipableDtoState {
  actionType: string | null;
  payload: WelcomesDto | null;
}

const initialState: ParticipableDtoState = {
  actionType: null,
  payload: null,
};

const datapassTwo = createSlice({
  name: 'datapassTwo',
  initialState,
  reducers: {
    setDatapassTwo: (state, action: PayloadAction<string>) => {
      state.actionType = action.payload;
    },
    setDatapassTwoPayload: (state, action: PayloadAction<WelcomesDto>) => {
      state.payload = action.payload;
    },
    clearDatapassTwo: (state) => {
      state.actionType = null;
      state.payload = null;
    },
  },
});

export const { setDatapassTwo, setDatapassTwoPayload, clearDatapassTwo } = datapassTwo.actions;
export default datapassTwo.reducer;
