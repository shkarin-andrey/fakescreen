import type { Message } from '../../redux/state/chatSlice';

export interface IMessageChat {
  id: Message['id'];
  type: Message['type'];
  message: Message['message'];
  time: Message['time'];
  image: Message['image'];
  isViewed: Message['isViewed'];
  prevType: Message['type'] | null;
  nextType: Message['type'] | null;
  className?: string;
  style?: React.CSSProperties | undefined;
}
