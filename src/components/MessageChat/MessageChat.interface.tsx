import type { Message } from '../../redux/state/chatSlice';

export interface IMessageChat {
  type: Message['type'];
  message: Message['message'];
  time: Message['time'];
  isViewed: Message['isViewed'];
  prevType: Message['type'] | null;
  nextType: Message['type'] | null;
}
