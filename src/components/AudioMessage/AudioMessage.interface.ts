import { Message } from '../../redux/state/chatSlice';

export interface IAudioMessage {
  id: string;
  seconds: number;
  time: Message['time'];
  type: Message['type'];
  isViewed: Message['isViewed'];
  isListened: Message['isListened'];
  prevType: Message['type'] | null;
  nextType: Message['type'] | null;
  audioList: Message['audioList'];
}
