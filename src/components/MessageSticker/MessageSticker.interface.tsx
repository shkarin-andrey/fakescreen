import { Message } from '../../redux/state/chatSlice';

export interface IMessageSticker {
  isViewed: Message['isViewed'];
  type: Message['type'];
  sticker: Message['sticker'];
  time: Message['time'];
}
