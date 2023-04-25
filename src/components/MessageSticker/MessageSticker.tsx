import { FC } from 'react';

import MessageTime from '../MessageTime/MessageTime';
import { IMessageSticker } from './MessageSticker.interface';

const MessageSticker: FC<IMessageSticker> = ({ isViewed, type, sticker, time }) => {
  return (
    <div className={`w-40 h-40 relative mt-[7px] ${type === 'owner' ? 'ml-auto' : ''}`}>
      <img className='w-full h-full object-cover' src={sticker} alt='' />
      <div className='absolute bottom-[6px] -right-1'>
        <MessageTime isViewed={isViewed} type={type} time={time} isBackground />
      </div>
    </div>
  );
};

export default MessageSticker;
