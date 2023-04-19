import { FC } from 'react';

import ViewedMessageIcon from '../../assets/icons/ViewedMessageIcon';
import { IMessageTime } from './MessageTime.interface';

const MessageTime: FC<IMessageTime> = ({
  type,
  time,
  isBackground = false,
  isViewed,
}) => {
  return (
    <div
      className={`flex items-center text-[10px] py-[1px] pl-[5px] pr-[3px] rounded-3xl ${
        isBackground ? 'bg-[#72839166]' : ''
      } ${type === 'owner' || isBackground ? 'text-white' : 'text-[#8C8C8C]'}`}
    >
      <span>{time}</span>
      {isViewed && type === 'owner' && <ViewedMessageIcon />}
    </div>
  );
};

export default MessageTime;
