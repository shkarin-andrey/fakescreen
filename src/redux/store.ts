import { configureStore } from '@reduxjs/toolkit';

import { stateApi } from './api/state';
import chatReducer from './state/chatSlice';
import configReducer from './state/configSlice';
import languageReducer from './state/languageSlice';

export const store = configureStore({
  reducer: {
    [stateApi.reducerPath]: stateApi.reducer,
    config: configReducer,
    chat: chatReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stateApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
