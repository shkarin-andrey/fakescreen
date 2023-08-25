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
  isListened: boolean;
  time: string;
  sticker?: string;
  image?: string;
  audioList?: number[];
  audioMessage?: number;
};

interface ChatState {
  data: (Message | ChatTime)[];
}

const initialState: ChatState = {
  data: [],
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
    resetChat: (state) => {
      state.data = [];
    },
    setGlobalChat: (state, action: PayloadAction<ChatState>) => {
      state.data = action.payload.data;
    },
  },
});

export const {
  setChatTime,
  setMessage,
  deleteMessage,
  updateMessage,
  resetChat,
  setGlobalChat,
} = chatSlice.actions;

export default chatSlice.reducer;
