import { Message } from '../../redux/state/chatSlice';

export interface IMessageSticker {
  id: Message['id'];
  isViewed: Message['isViewed'];
  type: Message['type'];
  sticker: Message['sticker'];
  time: Message['time'];
}
