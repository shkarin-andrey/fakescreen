import { FC, memo, useMemo } from 'react';

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
  const classNameTextColor = useMemo(() => {
    if (isBackground) {
      return 'text-white';
    }

    if (type === 'owner') {
      return 'text-[#C0DDFC]';
    }

    return 'text-[#ADADAD]';
  }, [isBackground, type]);

  const classNameBg = useMemo(() => {
    if (isBackground) {
      return 'bg-[#72839166]';
    }
  }, [isBackground]);

  return (
    <div
      className={`flex items-end gap-[1px] float-right text-right text-[8.56px] font-light pb-[3px] pt-[1px] pl-[5px] leading-none rounded-3xl ${classNameBg} ${classNameTextColor} ${className}`}
    >
      <div className='leading-none'>{time}</div>
      {isViewed && type === 'owner' && <ViewedMessageIcon />}
      {!isViewed && type === 'owner' && <NoViewedMessageIcon />}
    </div>
  );
};

export default memo(MessageTime);
