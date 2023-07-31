import { Message } from '../../redux/state/chatSlice';

export interface IAudioMessage {
  seconds: number;
  time: Message['time'];
  type: Message['type'];
  isViewed: Message['isViewed'];
  prevType: Message['type'] | null;
  nextType: Message['type'] | null;
}
