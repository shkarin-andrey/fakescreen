import { ChatTime, Message } from '../../../redux/state/chatSlice';

export interface IModalEditMessage {
  id: string;
  isOpneModal: boolean;
  setIsOpneModal: React.Dispatch<React.SetStateAction<boolean>>;
  type?: Message['type'];
  isViewed?: Message['isViewed'];
  isListened?: Message['isListened'];
  time?: Message['time'];
  chatTime?: ChatTime['chatTime'] | null;
  message?: Message['message'];
  seconds?: number;
  audioList?: number[];
}

export interface IModalEditMessageSave {
  index: number;
  data: {
    type?: Message['time'];
    isViewed?: Message['isViewed'];
    isListened?: Message['isListened'];
    time?: Message['time'];
    chatTime?: ChatTime['chatTime'];
    message?: Message['message'];
    audioMessage?: Message['audioMessage'];
    audioList?: number[];
  };
}
