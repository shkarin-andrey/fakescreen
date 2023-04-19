import { FC } from 'react';

import TailIcon from '../../assets/icons/TailIcon';
import MessageTime from '../MessageTime/MessageTime';
import { IMessageChat } from './MessageChat.interface';

const MessageChat: FC<IMessageChat> = ({
  type,
  message,
  time,
  isViewed,
  prevType,
  nextType,
}) => {
  const isOwner =
    type === 'owner' ? 'bg-[#007AFF] text-white ml-auto' : 'bg-white text-black';

  const isNextType = nextType === type;
  const isPrevType = prevType !== type;

  const classNameNextType = isNextType ? 'mt-[2px]' : 'mt-[6px]';
  const classNameRounded = () => {
    if (type === 'owner') {
      return isPrevType && isNextType && nextType !== null
        ? 'rounded-tr-[5px]'
        : !isPrevType && isNextType
        ? 'rounded-r-[5px]'
        : !isPrevType && !isNextType
        ? 'rounded-br-[5px]'
        : '';
    }

    return isPrevType && isNextType && nextType !== null
      ? 'rounded-tl-[5px]'
      : !isPrevType && isNextType
      ? 'rounded-l-[5px]'
      : !isPrevType && !isNextType
      ? 'rounded-bl-[5px]'
      : '';
  };

  const classNamePrevTypeTail =
    isPrevType && type === 'owner' ? '-right-1' : '-left-1 -scale-x-100';

  return (
    <div
      className={`flex flex-wrap pl-[11px] pr-[6px] py-[5px] rounded-[13px] text-base max-w-[245px]  relative leading-[134%] ${isOwner} ${classNameNextType} ${classNameRounded()}`}
    >
      <div className='tracking-[1px]'>{message}</div>
      <div className='ml-auto -mb-1'>
        <MessageTime type={type} time={time} isViewed={isViewed} />
      </div>
      {isPrevType && (
        <div className={`absolute -bottom-[5px] ${classNamePrevTypeTail}`}>
          <TailIcon type={type} />
        </div>
      )}
    </div>
  );
};

export default MessageChat;
