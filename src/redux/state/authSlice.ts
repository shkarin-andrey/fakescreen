import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { handleIsAuth } from '../../utils/handleIsAuth';

interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: handleIsAuth(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<AuthState['isAuth']>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
