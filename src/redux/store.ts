import { configureStore } from '@reduxjs/toolkit';

import { stateApi } from './api/state';
import chatReducer from './state/chatSlice';
import configReducer from './state/configSlice';
import languageReducer from './state/languageSlice';
import themeReducer from './state/themeState';

export const store = configureStore({
  reducer: {
    [stateApi.reducerPath]: stateApi.reducer,
    config: configReducer,
    chat: chatReducer,
    language: languageReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stateApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
