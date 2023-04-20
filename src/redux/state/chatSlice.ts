import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type ChatTime = {
  id: string;
  chatTime: string;
};

export type Message = {
  id: string;
  type: string;
  message?: string;
  isViewed: boolean;
  time: string;
  sticker?: string;
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
    resetChat: (state) => {
      state.data = [];
    },
  },
});

export const { setChatTime, setMessage, resetChat, deleteMessage } = chatSlice.actions;

export default chatSlice.reducer;

[
  {
    chatTime: '10:10',
  },
  {
    type: 'owner',
    message: 'qweqeqweqwe',
    isViewed: true,
    time: '15:45',
  },
  {
    type: 'interlocutor',
    message: 'qweqeqweqwe',
    isViewed: true,
    time: '15:45',
  },
];
