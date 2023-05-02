import { FC } from 'react';

import NoViewedMessageIcon from '../../assets/icons/NoViewedMessageIcon';
import ViewedMessageIcon from '../../assets/icons/ViewedMessageIcon';
import { IMessageTime } from './MessageTime.interface';

const MessageTime: FC<IMessageTime> = ({
  type,
  time,
  isBackground = false,
  isViewed,
  className = '',
}) => {
  return (
    <div
      className={`flex items-end float-right text-right text-[10px] pb-[4px] pt-[1px] pl-[5px] pr-[3px] leading-none rounded-3xl ${
        isBackground ? 'bg-[#72839166]' : ''
      } ${
        isBackground
          ? 'text-white'
          : type === 'owner'
          ? 'text-[#CDE5FF]'
          : 'text-[#8C8C8C]'
      } ${className}`}
    >
      <div className='leading-none'>{time}</div>
      {isViewed && type === 'owner' && <ViewedMessageIcon />}
      {!isViewed && type === 'owner' && <NoViewedMessageIcon />}
    </div>
  );
};

export default MessageTime;
