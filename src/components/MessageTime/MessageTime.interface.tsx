import { Message } from '../../redux/state/chatSlice';

export interface IMessageTime {
  type: Message['type'];
  time: Message['time'];
  isViewed: Message['isViewed'];
  isBackground?: boolean;
}
