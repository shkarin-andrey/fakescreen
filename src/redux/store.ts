import { configureStore } from '@reduxjs/toolkit';

import chatReducer from './state/chatSlice';
import configReducer from './state/configSlice';

export const store = configureStore({
  reducer: {
    config: configReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
