import { Message } from '../../../redux/state/chatSlice';

export interface IAudioLine {
  type: Message['type'];
  isListened: Message['isListened'];
  dataList: Message['audioList'];
  width: number;
}
