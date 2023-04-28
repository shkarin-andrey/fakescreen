import { FC, useEffect, useRef, useState } from 'react';

import TailIcon from '../../assets/icons/TailIcon';
import MessageTime from '../MessageTime/MessageTime';
import ModalEditMessage from '../Modal/ModalEditMessage';
import { IMessageChat } from './MessageChat.interface';

const MessageChat: FC<IMessageChat> = ({
  id,
  type,
  message,
  time,
  isViewed,
  prevType,
  nextType,
}) => {
  const [isOpneModal, setIsOpneModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = message;
    }
  }, [message]);

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

  const handleOpenModal = () => {
    setIsOpneModal(true);
  };

  return (
    <>
      <div
        aria-hidden={true}
        onClick={handleOpenModal}
        className={`flex pl-[11px] pr-[6px] py-[4px] rounded-[13px] text-base max-w-[250px] w-fit relative leading-[134%] ${isOwner} ${classNameNextType} ${classNameRounded()}`}
      >
        <div>
          <div ref={ref} className='contents tracking-[0.6px] break-all' />
          <MessageTime
            className='mt-[8px] pb-0'
            type={type}
            time={time}
            isViewed={isViewed}
          />
        </div>
        {isPrevType && (
          <div className={`absolute -bottom-[6px] ${classNamePrevTypeTail}`}>
            <TailIcon type={type} />
          </div>
        )}
      </div>
      <ModalEditMessage
        id={id}
        type={type}
        time={time}
        isViewed={isViewed}
        isOpneModal={isOpneModal}
        setIsOpneModal={setIsOpneModal}
        message={message}
      />
    </>
  );
};

export default MessageChat;
