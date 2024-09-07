// languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../../components/amesComponents/language/Model';

interface LanguageState {
  selectedLanguage: Language | null;


}

const initialState: LanguageState = {
  selectedLanguage: null,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setSelectedLanguage: (state, action: PayloadAction<Language>) => {
      state.selectedLanguage = action.payload;
    },
   
    
    clearSelectedLanguage: (state) => {
      state.selectedLanguage = null;
    },
  },
});

export const { setSelectedLanguage, clearSelectedLanguage } = languageSlice.actions;
export default languageSlice.reducer;