import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
  step: number;
}

const initialState: MenuState = {
  step: 0,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<MenuState['step']>) => {
      state.step = action.payload;
    },
  },
});

export const { setStep } = menuSlice.actions;

export default menuSlice.reducer;
