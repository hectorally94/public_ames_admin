import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  selectedId: any | null;
}

const initialState: LanguageState = {
  selectedId: null,
};

const languageIdSlice = createSlice({
  name: 'languageid',
  initialState,
  reducers: {
    setSelectedLanguageId: (state, action: PayloadAction<any>) => {
      state.selectedId = action.payload;
    },
    clearSelectedLanguageId: (state) => {
      state.selectedId = null;
    },
  },
});

export const { setSelectedLanguageId, clearSelectedLanguageId } = languageIdSlice.actions;
export default languageIdSlice.reducer;
