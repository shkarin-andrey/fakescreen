import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import TailIcon from '../../assets/icons/TailIcon';
import { useAppSelector } from '../../hooks/useAppSelector';
import MessageTime from '../MessageTime/MessageTime';
import ModalEditMessage from '../Modal/ModalEditMessage';
import { gallary } from '../SettingsInterlocutor/SettingsInterlocutorIGallary/SettingsInterlocutorIGallary.config';
import {
  classNameHeigthEmoji,
  classNameImagePadding,
  classNameMessage,
  classNameMessageTime,
  generateMaskImageType,
  rxEmoji,
  rxEmojiOne,
} from './MessageChat.config';
import { IMessageChat, IMessageImageMask } from './MessageChat.interface';

const MessageChat: FC<IMessageChat> = ({
  id,
  type,
  message = '',
  time,
  isViewed,
  prevType,
  nextType,
  image,
  className = '',
  style,
  fileList,
}) => {
  const [mask, setMask] = useState<IMessageImageMask>({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [width, setWidth] = useState<number | 'auto'>('auto');
  const messageRef = useRef<HTMLDivElement>(null);
  const messageWrapperRef = useRef<HTMLDivElement>(null);

  const bgImage = useAppSelector((state) => state.config.bgImage);

  const generateMaskImage = useMemo(() => generateMaskImageType(mask), [mask]);

  const isMessage = message.trim() !== '';

  const matchMessageEmoji = message
    .match(rxEmoji)?.[0]
    .split(rxEmojiOne)
    .filter((item) => item !== '');
  const matchMessageEmojiLength = matchMessageEmoji?.length;

  const htmlElementImage = (src: string, index: number, className: string): string => {
    return `<img key="emoji-size-${index}" class="${className}" src="${src}" alt="emoji-${index}">`;
  };

  useEffect(() => {
    setWidth('auto');

    if (messageRef.current && messageWrapperRef.current) {
      if (matchMessageEmoji && matchMessageEmojiLength) {
        let messageEmoji: string[] = [];

        if (matchMessageEmojiLength === 1) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(item, index, `w-[80px] h-[80px]`),
          );
        }
        if (matchMessageEmojiLength === 2) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(item, index, `w-[59px] h-[59px]`),
          );
        }
        if (matchMessageEmojiLength === 3) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(item, index, `w-[45px] h-[45px]`),
          );
        }
        if (matchMessageEmojiLength === 4) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(item, index, `w-[35px] h-[35px]`),
          );
        }
        if (matchMessageEmojiLength === 5) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(item, index, `w-[30px] h-[30px]`),
          );
        }
        if (matchMessageEmojiLength === 6) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(item, index, `w-[25px] h-[25px]`),
          );
        }
        if (matchMessageEmojiLength > 6) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(item, index, `w-[15px] h-[15px]`),
          );
        }

        messageRef.current.innerHTML = messageEmoji.join('');
      } else {
        messageRef.current.innerHTML = message;
      }

      if (messageWrapperRef.current.offsetHeight > 30) {
        setWidth(messageRef.current.offsetWidth + 1);
      }
    }
  }, [message, matchMessageEmojiLength, matchMessageEmoji, htmlElementImage]);

  const bgMessage = useMemo(() => {
    if (bgImage === gallary[1]?.preview) {
      return 'bg-[#F1F1F4]';
    }

    return 'bg-white';
  }, [bgImage, gallary]);

  const bgOwner = !matchMessageEmojiLength
    ? 'bg-gradient-to-b from-[#5FA2F4] to-[#5DA0F5] dark:from-[#313131] dark:to-[#313131]'
    : '';

  const bgInterlocutor = matchMessageEmojiLength ? '' : `${bgMessage} dark:bg-[#1A1A1A]`;

  const isOwner = useMemo(() => {
    if (type === 'owner') {
      return `${bgOwner} text-white ml-auto`;
    }

    return `${bgInterlocutor} text-black dark:text-white`;
  }, [type, bgMessage, bgOwner, bgInterlocutor]);

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
        ? 'rounded-tr-[6px]'
        : !isPrevType && isNextType
        ? 'rounded-r-[6px]'
        : !isPrevType && !isNextType
        ? 'rounded-br-[6px]'
        : '';
    }

    return isPrevType && isNextType && nextType !== null
      ? 'rounded-tl-[6px]'
      : !isPrevType && isNextType
      ? 'rounded-l-[6px]'
      : !isPrevType && !isNextType
      ? 'rounded-bl-[6px]'
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
        ? className.push('!rounded-tr-[6px]')
        : !isPrevType && isNextType && !isMessage
        ? className.push('!rounded-r-[6px]')
        : !isPrevType && isNextType && !isMessage
        ? className.push('!rounded-tr-[6px]')
        : !isPrevType && !isNextType && !isMessage
        ? className.push('rounded-br-[6px]')
        : '';
    } else {
      isPrevType && isNextType && nextType !== null
        ? className.push('!rounded-tl-[6px]')
        : !isPrevType && isNextType && !isMessage
        ? className.push('!rounded-l-[6px]')
        : !isPrevType && isNextType && !isMessage
        ? className.push('!rounded-tl-[6px]')
        : !isPrevType && !isNextType && !isMessage
        ? className.push('rounded-bl-[6px]')
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

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const maskImage = useMemo(() => {
    const styleObj: React.CSSProperties = {};

    if (image && !isMessage && isPrevType) {
      styleObj.WebkitMaskBoxImage = `url(${generateMaskImage}) 0 0 0 0 round round`;
      styleObj.WebkitMaskRepeat = 'no-repeat';

      if (type === 'owner') {
        styleObj.WebkitMaskPosition = 'right bottom';
        styleObj.borderBottomRightRadius = 0;
        styleObj.transform = 'translateX(3px)';
      } else {
        styleObj.WebkitMaskPosition = 'left bottom';
        styleObj.borderBottomLeftRadius = 0;
        styleObj.transform = 'translateX(-3px)';
      }
    }

    return styleObj;
  }, [image, isMessage, isPrevType, type, generateMaskImage]);

  const borderRadiusImageMask = useMemo(() => {
    const styleObj: React.CSSProperties = {
      background: `url('${image}') center center/cover no-repeat`,
    };

    if (image && !isMessage && isPrevType) {
      if (type === 'owner') {
        styleObj.borderBottomRightRadius = 0;
      } else {
        styleObj.borderBottomLeftRadius = 0;
      }
    }

    return styleObj;
  }, [image, isMessage, isPrevType, type]);

  useEffect(() => {
    if (!messageWrapperRef.current) return;

    if (image && !isMessage && isPrevType) {
      if (isNextType && nextType !== null) {
        setMask((prev) => ({
          ...prev,
          rounded: true,
        }));
      } else {
        setMask((prev) => ({
          ...prev,
          rounded: false,
        }));
      }

      if (
        (messageWrapperRef.current.clientHeight <=
          messageWrapperRef.current.clientWidth + 10 &&
          messageWrapperRef.current.clientHeight >=
            messageWrapperRef.current.clientWidth - 10) ||
        (messageWrapperRef.current.clientWidth <=
          messageWrapperRef.current.clientHeight + 10 &&
          messageWrapperRef.current.clientWidth >=
            messageWrapperRef.current.clientHeight - 10)
      ) {
        if (type === 'owner') {
          setMask((prev) => ({
            ...prev,
            position: 'right',
            type: 'square',
          }));
        } else {
          setMask((prev) => ({
            ...prev,
            position: 'left',
            type: 'square',
          }));
        }
      } else if (messageWrapperRef.current.clientHeight > 200) {
        if (type === 'owner') {
          setMask((prev) => ({
            ...prev,
            position: 'right',
            type: 'vertical',
          }));
        } else {
          setMask((prev) => ({
            ...prev,
            position: 'left',
            type: 'vertical',
          }));
        }
      } else {
        if (type === 'owner') {
          setMask((prev) => ({
            ...prev,
            position: 'right',
            type: 'horizontal',
          }));
        } else {
          setMask((prev) => ({
            ...prev,
            position: 'left',
            type: 'horizontal',
          }));
        }
      }
    }
  }, [
    messageWrapperRef.current,
    image,
    isMessage,
    isPrevType,
    type,
    nextType,
    isNextType,
  ]);

  const maxWidthImage = useMemo(() => {
    if (image && !isMessage && isPrevType) {
      return 'max-w-[238px]';
    }

    if (image && !isMessage) {
      return 'max-w-[235px]';
    }

    return 'max-w-[282px]';
  }, [image, isMessage, isPrevType]);

  const timePosition = useMemo(() => {
    if (image && !isMessage && isPrevType && type === 'owner') {
      return 'right-2';
    }

    return 'right-1';
  }, [image, isMessage, isPrevType, type]);

  return (
    <>
      <div
        ref={messageWrapperRef}
        aria-hidden={true}
        onClick={handleOpenModal}
        className={`flex rounded-[13px] font-light text-[13.26px] w-fit relative leading-[134%] ${maxWidthImage} ${
          image ? 'flex-col' : classNameImagePadding(matchMessageEmojiLength)
        } ${isOwner} ${classNameNextType} ${classNameRounded()} ${className}`}
        style={{ ...maskImage, ...style }}
      >
        {image && (
          <div
            className={`flex justify-center backdrop-blur-3xl ${classNameRoundedImage()}`}
            style={borderRadiusImageMask}
          >
            <img
              className={`w-full max-w-[282px] max-h-[280px] min-w-[100px] min-h-[100px] object-contain backdrop-blur-md ${classNameRoundedImage()}`}
              src={image}
              alt='img'
            />
          </div>
        )}
        {isMessage ? (
          <>
            <div
              className={
                image
                  ? classNameImagePadding()
                  : matchMessageEmojiLength
                  ? classNameHeigthEmoji(matchMessageEmojiLength)
                  : ''
              }
              style={{
                width: image ? undefined : width,
              }}
            >
              <span
                ref={messageRef}
                className={classNameMessage(type, matchMessageEmojiLength)}
                style={{
                  wordBreak: 'break-word',
                }}
              />
              <MessageTime
                className={`mt-[5px] ${classNameMessageTime(
                  type,
                  matchMessageEmojiLength,
                )}`}
                type={type}
                time={time}
                isViewed={isViewed}
                isBackground={!!matchMessageEmojiLength}
              />
            </div>
            {isPrevType && !matchMessageEmojiLength && (
              <div className={`absolute -bottom-[6px] ${classNamePrevTypeTail}`}>
                <TailIcon type={type} />
              </div>
            )}
          </>
        ) : (
          <div className={`absolute bottom-[6px] ${timePosition}`}>
            <MessageTime
              className={`mt-[8px] pb-0 ${image ? 'backdrop-blur-none' : ''}`}
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
        defaultFileList={fileList}
        image={image}
      />
    </>
  );
};

export default memo(MessageChat);
