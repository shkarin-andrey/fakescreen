import { Message } from '../../../redux/state/chatSlice';

export interface IModalEditMessage {
  id: string;
  isOpneModal: boolean;
  setIsOpneModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: Message['type'];
  isViewed: Message['isViewed'];
  time: Message['time'];
}
