import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type ChatTime = {
  id: string;
  chatTime: string;
};

export type Message = {
  id: string;
  type: string;
  message: string;
  isViewed: boolean;
  time: string;
  sticker?: string;
  image?: string;
};

interface ChatState {
  data: (Message | ChatTime)[];
  blurMessage: any[];
}

const initialState: ChatState = {
  data: [],
  blurMessage: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatTime: (state, action: PayloadAction<ChatTime>) => {
      state.data.unshift(action.payload);
    },
    setMessage: (state, action: PayloadAction<Message>) => {
      state.data.unshift(action.payload);
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    updateMessage: (state, action: PayloadAction<any>) => {
      const data = { ...state.data[action.payload.index], ...action.payload.data };
      state.data.splice(action.payload.index, 1, data);
    },
    setBlurMessage: (state, action: PayloadAction<ChatState['blurMessage']>) => {
      state.blurMessage = action.payload;
    },
    resetChat: (state) => {
      state.data = [];
    },
    setGlobalChat: (state, action: PayloadAction<ChatState>) => {
      state.data = action.payload.data;
      state.blurMessage = action.payload.blurMessage;
    },
  },
});

export const {
  setChatTime,
  setMessage,
  deleteMessage,
  updateMessage,
  resetChat,
  setBlurMessage,
  setGlobalChat,
} = chatSlice.actions;

export default chatSlice.reducer;
