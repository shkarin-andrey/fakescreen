import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import TailIcon from '../../assets/icons/TailIcon';
import maskHorizontalLeft from '../../assets/images/mask-message-horizontal-left.svg';
import maskHorizontalRight from '../../assets/images/mask-message-horizontal-right.svg';
import maskHorizontalRoundLeft from '../../assets/images/mask-message-horizontal-round-left.svg';
import maskHorizontalRoundRight from '../../assets/images/mask-message-horizontal-round-right.svg';
import maskSquareLeft from '../../assets/images/mask-message-square-left.svg';
import maskSquareRight from '../../assets/images/mask-message-square-right.svg';
import maskSquareRoundLeft from '../../assets/images/mask-message-square-round-left.svg';
import maskSquareRoundRight from '../../assets/images/mask-message-square-round-right.svg';
import maskVerticalLeft from '../../assets/images/mask-message-vertical-left.svg';
import maskVerticalRight from '../../assets/images/mask-message-vertical-right.svg';
import maskVerticalRoundLeft from '../../assets/images/mask-message-vertical-round-left.svg';
import maskVerticalRoundRight from '../../assets/images/mask-message-vertical-round-right.svg';
import { useAppSelector } from '../../hooks/useAppSelector';
import MessageTime from '../MessageTime/MessageTime';
import ModalEditMessage from '../Modal/ModalEditMessage';
import { gallary } from '../SettingsInterlocutor/SettingsInterlocutorIGallary/SettingsInterlocutorIGallary.config';
import { IMessageChat } from './MessageChat.interface';

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
  const [mask, setMask] = useState<{
    position?: 'right' | 'left';
    type?: 'vertical' | 'horizontal' | 'square';
    rounded?: boolean;
  }>({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [width, setWidth] = useState<number | 'auto'>('auto');
  const messageRef = useRef<HTMLDivElement>(null);
  const messageWrapperRef = useRef<HTMLDivElement>(null);

  const bgImage = useAppSelector((state) => state.config.bgImage);

  const isMessage = message.trim() !== '';

  const rxEmoji = new RegExp(`^(<img\\s+[^>]*src="([^"]*)"[^>]*>)+$`, 'gm');
  const rxEmojiOne = new RegExp(`<img\\s+[^>]*src="([^"]*)"[^>]*>`, 'gm');

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
            htmlElementImage(
              item,
              index,
              `w-[80px] h-[80px] translate-y-[6px] ${
                type === 'owner' ? '-translate-x-[3px]' : 'translate-x-[3px]'
              }`,
            ),
          );
        }
        if (matchMessageEmojiLength === 2) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(
              item,
              index,
              `w-[59px] h-[59px] translate-y-[14px] ${
                type === 'owner' ? 'translate-x-[5px]' : '-translate-x-[6px]'
              }`,
            ),
          );
        }
        if (matchMessageEmojiLength === 3) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(
              item,
              index,
              `w-[45px] h-[45px] translate-y-[14px] ${
                type === 'owner' ? 'translate-x-[4px]' : '-translate-x-[4px]'
              }`,
            ),
          );
        }
        if (matchMessageEmojiLength === 4) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(
              item,
              index,
              `w-[35px] h-[35px] translate-y-[13px] ${
                type === 'owner' ? 'translate-x-[4px]' : '-translate-x-[6px]'
              }`,
            ),
          );
        }
        if (matchMessageEmojiLength === 5) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(
              item,
              index,
              `w-[30px] h-[30px] translate-y-[12px] ${
                type === 'owner' ? 'translate-x-[5px]' : '-translate-x-[5px]'
              }`,
            ),
          );
        }
        if (matchMessageEmojiLength === 6) {
          messageEmoji = matchMessageEmoji.map((item, index) =>
            htmlElementImage(
              item,
              index,
              `w-[25px] h-[25px] translate-y-[10px] ${
                type === 'owner' ? 'translate-x-[4px]' : '-translate-x-[6px]'
              }`,
            ),
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
  }, [message, matchMessageEmojiLength, matchMessageEmoji, htmlElementImage, type]);

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

  const classNameMessage = useMemo(() => {
    let classNameMessageEmoji: React.HTMLAttributes<HTMLDivElement>['className'] =
      '-tracking-[0.3px]';

    if (matchMessageEmojiLength === 1) {
      classNameMessageEmoji = 'inline-flex gap-[10px]';
    }

    if (matchMessageEmojiLength === 2) {
      classNameMessageEmoji = 'inline-flex gap-[7px]';
    }
    if (matchMessageEmojiLength === 3) {
      classNameMessageEmoji = 'inline-flex gap-[9px]';
    }
    if (matchMessageEmojiLength === 4) {
      classNameMessageEmoji = 'inline-flex gap-[6px]';
    }
    if (matchMessageEmojiLength === 5) {
      classNameMessageEmoji = 'inline-flex gap-[8px]';
    }
    if (matchMessageEmojiLength === 6) {
      classNameMessageEmoji = 'inline-flex gap-[6px]';
    }
    if (matchMessageEmojiLength && matchMessageEmojiLength > 6) {
      classNameMessageEmoji = 'flex gap-[3px] w-fit flex-wrap';
    }

    return classNameMessageEmoji;
  }, [matchMessageEmoji, type]);

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

  const classNameImagePadding = useMemo(() => {
    const defaultClassName = 'pl-[8px] pr-[6px] pb-[3.1px]';
    if (matchMessageEmojiLength && matchMessageEmojiLength > 6) {
      return `${defaultClassName} pt-2`;
    }
    return `${defaultClassName} pt-[4px]`;
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const generateMaskImage = useMemo(() => {
    const maskTypeSquare = mask?.type === 'square';
    const maskTypeHorizontal = mask?.type === 'horizontal';
    const maskTypeVertical = mask?.type === 'vertical';
    const maskPositionRight = mask?.position === 'right';
    const maskPositionLeft = mask?.position === 'left';

    if (maskTypeSquare && maskPositionRight) {
      if (mask?.rounded) {
        return maskSquareRoundRight;
      }

      return maskSquareRight;
    }

    if (maskTypeSquare && maskPositionLeft) {
      if (mask?.rounded) {
        return maskSquareRoundLeft;
      }

      return maskSquareLeft;
    }

    if (maskTypeHorizontal && maskPositionRight) {
      if (mask?.rounded) {
        return maskHorizontalRoundRight;
      }

      return maskHorizontalRight;
    }

    if (maskTypeHorizontal && maskPositionLeft) {
      if (mask?.rounded) {
        return maskHorizontalRoundLeft;
      }

      return maskHorizontalLeft;
    }

    if (maskTypeVertical && maskPositionRight) {
      if (mask?.rounded) {
        return maskVerticalRoundRight;
      }

      return maskVerticalRight;
    }

    if (maskTypeVertical && maskPositionLeft) {
      if (mask?.rounded) {
        return maskVerticalRoundLeft;
      }

      return maskVerticalLeft;
    }
  }, [mask?.type, mask?.position, mask?.rounded]);

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
  }, [image, isMessage, isPrevType, matchMessageEmojiLength]);

  const timePosition = useMemo(() => {
    if (image && !isMessage && isPrevType && type === 'owner') {
      return 'right-2';
    }

    return 'right-1';
  }, [image, isMessage, isPrevType, type]);

  const classNameMessageTime = useMemo(() => {
    const className: string[] = [];
    if (!matchMessageEmojiLength) {
      className.push('translate-x-[4px]');
    }

    if (matchMessageEmojiLength) {
      className.push('pr-[6px]');
    }
    if (matchMessageEmojiLength === 1) {
      className.push('-translate-y-[9px]');
      if (type === 'owner') {
        className.push('translate-x-[4px]');
      } else {
        className.push('translate-x-[9px]');
      }
    }
    if (matchMessageEmojiLength === 2) {
      className.push('translate-y-[18px]');
      if (type === 'owner') {
        className.push('translate-x-[4px]');
      } else {
        className.push('-translate-x-[8px]');
      }
    }

    if (matchMessageEmojiLength === 3) {
      className.push('translate-y-[18px]');
      if (type === 'owner') {
        className.push('translate-x-[4px]');
      } else {
        className.push('-translate-x-[6px]');
      }
    }

    if (matchMessageEmojiLength === 4) {
      className.push('translate-x-[4px] translate-y-[11px]');
    }

    if (matchMessageEmojiLength === 5) {
      className.push(' translate-y-[11px]');
      if (type === 'owner') {
        className.push('translate-x-[4px]');
      } else {
        className.push('-translate-x-[8px]');
      }
    }

    if (matchMessageEmojiLength === 6) {
      className.push('translate-y-[6px]');
      if (type === 'owner') {
        className.push('translate-x-[4px]');
      } else {
        className.push('-translate-x-[7px]');
      }
    }

    if (matchMessageEmojiLength && matchMessageEmojiLength > 6) {
      className.push('translate-y-[1px]');
      if (type === 'owner') {
        className.push('translate-x-[4px]');
      } else {
        className.push('');
      }
    }

    if (!matchMessageEmojiLength) {
      className.push('!pl-0 pb-0');
    } else {
      className.push('pb-[2px] pt-[3px]');
    }

    return className.join(' ');
  }, [matchMessageEmojiLength, type]);

  const classNameHeigthEmoji = useMemo(() => {
    if (matchMessageEmojiLength === 1) {
      return 'h-[93px]';
    }

    if (matchMessageEmojiLength === 2) {
      return 'h-[99px]';
    }

    if (matchMessageEmojiLength === 3) {
      return 'h-[85px]';
    }

    if (matchMessageEmojiLength === 4) {
      return 'h-[69px]';
    }

    if (matchMessageEmojiLength === 5) {
      return 'h-[63px]';
    }

    if (matchMessageEmojiLength === 6) {
      return 'h-[53px]';
    }

    return '';
  }, [matchMessageEmojiLength]);

  return (
    <>
      <div
        ref={messageWrapperRef}
        aria-hidden={true}
        onClick={handleOpenModal}
        className={`flex rounded-[13px] font-light text-[13.26px] w-fit relative leading-[134%] ${maxWidthImage} ${
          image ? 'flex-col' : classNameImagePadding
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
                  ? classNameImagePadding
                  : matchMessageEmojiLength
                  ? classNameHeigthEmoji
                  : ''
              }
              style={{
                width: image ? undefined : width,
              }}
            >
              <span
                ref={messageRef}
                className={classNameMessage}
                style={{
                  wordBreak: 'break-word',
                }}
              />
              <MessageTime
                className={`mt-[5px] ${classNameMessageTime}`}
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
