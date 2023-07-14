import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import TailIcon from '../../assets/icons/TailIcon';
import { useAppSelector } from '../../hooks/useAppSelector';
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
  className = '',
  style,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [width, setWidth] = useState<number | 'auto'>('auto');
  const messageRef = useRef<HTMLDivElement>(null);
  const messageWrapperRef = useRef<HTMLDivElement>(null);

  const bgImage = useAppSelector((state) => state.config.bgImage);

  const isMessage = message.trim() !== '';

  useEffect(() => {
    setWidth('auto');

    if (messageRef.current && messageWrapperRef.current) {
      messageRef.current.innerHTML = message;

      if (messageWrapperRef.current.offsetHeight > 30) {
        console.log(
          messageWrapperRef.current.offsetWidth,
          messageRef.current.offsetWidth,
        );

        setWidth(messageRef.current.offsetWidth + 1);
      }
    }
  }, [message, messageRef.current, messageWrapperRef.current]);

  const bgMessage = useMemo(() => {
    if (bgImage === '/src/assets/images/bg-chat/pattern-12.jpg') {
      return 'bg-[#F1F1F4]';
    }

    return 'bg-white';
  }, [bgImage]);

  const isOwner = useMemo(() => {
    if (type === 'owner') {
      return 'bg-gradient-to-b from-[#5FA2F4] to-[#5DA0F5] dark:from-[#313131] dark:to-[#313131] text-white ml-auto';
    }

    return `${bgMessage} dark:bg-[#1A1A1A] text-black dark:text-white`;
  }, [type, bgMessage]);

  const isNextType = nextType === type;
  const isPrevType = prevType !== type;

  const classNameNextType = useMemo(() => {
    if (isNextType) {
      return 'mt-[2px]';
    }

    return 'mt-[6px]';
  }, [isNextType]);

  const classNameRounded = useCallback(() => {
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
  }, [type, isPrevType, isNextType, nextType]);

  const classNameRoundedImage = useCallback(() => {
    const className = [];

    if (isMessage) {
      className.push('rounded-t-[13px]');
    } else {
      className.push('rounded-[13px]');
    }

    if (type === 'owner') {
      isPrevType && isNextType && nextType !== null
        ? className.push('!rounded-tr-[5px]')
        : !isPrevType && isNextType && !isMessage
        ? className.push('!rounded-r-[5px]')
        : !isPrevType && isNextType && !isMessage
        ? className.push('!rounded-tr-[5px]')
        : !isPrevType && !isNextType && !isMessage
        ? className.push('rounded-br-[5px]')
        : '';
    } else {
      isPrevType && isNextType && nextType !== null
        ? className.push('!rounded-tl-[5px]')
        : !isPrevType && isNextType && !isMessage
        ? className.push('!rounded-l-[5px]')
        : !isPrevType && isNextType && !isMessage
        ? className.push('!rounded-tl-[5px]')
        : !isPrevType && !isNextType && !isMessage
        ? className.push('rounded-bl-[5px]')
        : '';
    }

    return className.join(' ');
  }, [isMessage, type, isPrevType, isNextType, nextType]);

  const classNamePrevTypeTail = useMemo(() => {
    if (isPrevType && type === 'owner') {
      return '-right-1';
    }

    return '-left-1 -scale-x-100';
  }, [isPrevType, type]);

  const classNameImagePadding = useMemo(() => {
    return 'px-[8px] pt-[3.5px] pb-[3.1px]';
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  return (
    <>
      <div
        ref={messageWrapperRef}
        aria-hidden={true}
        onClick={handleOpenModal}
        className={`flex rounded-[13px] font-light text-[13.26px] max-w-[272px] w-fit relative leading-[134%] ${
          image ? 'flex-col' : classNameImagePadding
        } ${isOwner} ${classNameNextType} ${classNameRounded()} ${className}`}
        style={style}
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
            <div
              className={image ? classNameImagePadding : ''}
              style={{
                width: image ? undefined : width,
              }}
            >
              <span ref={messageRef} className='-tracking-[0.3px]' />
              <MessageTime
                className='mt-[7px] pb-0'
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
              className='mt-[7px] pb-0'
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
        isOpneModal={isOpenModal}
        setIsOpneModal={setIsOpenModal}
        message={message}
      />
    </>
  );
};

export default memo(MessageChat);
