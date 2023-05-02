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
  image,
}) => {
  const [isOpneModal, setIsOpneModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isMessage = message.trim() !== '';

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

  const classNameRoundedImage = () => {
    const className = [];

    if (isMessage) {
      className.push('rounded-t-[13px]');
    } else {
      className.push('rounded-[13px]');
    }

    if (type === 'owner') {
      isPrevType && isNextType && nextType !== null
        ? className.push('!rounded-tr-[5px]')
        : !isPrevType && isNextType
        ? className.push('!rounded-r-[5px]')
        : '';
    } else {
      isPrevType && isNextType && nextType !== null
        ? className.push('!rounded-tl-[5px]')
        : !isPrevType && isNextType
        ? className.push('!rounded-l-[5px]')
        : '';
    }

    return className.join(' ');
  };

  const classNamePrevTypeTail =
    isPrevType && type === 'owner' ? '-right-1' : '-left-1 -scale-x-100';

  const classNameImagePadding = 'pl-[11px] pr-[6px] py-[4px]';

  const handleOpenModal = () => {
    setIsOpneModal(true);
  };

  return (
    <>
      <div
        aria-hidden={true}
        onClick={handleOpenModal}
        className={`flex rounded-[13px] text-base max-w-[250px] w-fit relative leading-[134%] ${
          image ? 'flex-col' : classNameImagePadding
        } ${isOwner} ${classNameNextType} ${classNameRounded()}`}
      >
        {image && (
          <div
            className={`flex justify-center backdrop-blur-3xl ${classNameRoundedImage()}`}
            style={{
              background: `url('${image}') center center/cover no-repeat`,
            }}
          >
            <img
              className={`w-full max-w-[257px] max-h-[316px] min-w-[100px] min-h-[100px] object-contain backdrop-blur-md ${classNameRoundedImage()}`}
              src={image}
              alt='img'
            />
          </div>
        )}
        {isMessage ? (
          <>
            <div className={image ? classNameImagePadding : ''}>
              <div ref={ref} className='contents tracking-[0.6px]' />
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
          </>
        ) : (
          <div className='absolute bottom-[6px] right-1'>
            <MessageTime
              className='mt-[8px] pb-0'
              type={type}
              time={time}
              isViewed={isViewed}
              isBackground
            />
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
