import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { LOCALES } from '../../i18n/locales';

type LanguageKeys = keyof typeof LOCALES;
type LanguageValues = (typeof LOCALES)[LanguageKeys]['value'];

interface LanguageState {
  language: LanguageValues;
}

const initialState: LanguageState = {
  language: LOCALES.RUSSIAN.value,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageState['language']>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
