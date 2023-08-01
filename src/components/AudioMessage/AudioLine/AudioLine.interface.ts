import { Message } from '../../../redux/state/chatSlice';

export interface IAudioLine {
  count?: number;
  type: Message['type'];
  isListened: Message['isListened'];
}
