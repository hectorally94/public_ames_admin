// AutreSlice.ts
import { createSlice, PayloadAction,  } from '@reduxjs/toolkit';
import { AutreInfoDto } from '../api/autreInfoApiSlice';
  
interface postAutreState {
  selectedAutre: AutreInfoDto | null;


}

const initialState: postAutreState = {
  selectedAutre: null,
};

const AutreSlice = createSlice({
  name: 'autre',
  initialState,
  reducers: {
    setSelectedAutre: (state, Autre: PayloadAction<AutreInfoDto>) => {
      state.selectedAutre = Autre.payload;
    },
   
    
    clearSelectedAutre: (state) => {
      state.selectedAutre = null;
    },
  },
});

export const { setSelectedAutre, clearSelectedAutre } = AutreSlice.actions;
export default AutreSlice.reducer;