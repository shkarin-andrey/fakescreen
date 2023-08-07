import { FC, useCallback, useMemo, useState } from 'react';

import DotIcon from '../../assets/icons/DotIcon';
import PlayIcon from '../../assets/icons/PlayIcon';
import TailIcon from '../../assets/icons/TailIcon';
import { useAppSelector } from '../../hooks/useAppSelector';
import { formatedCount } from '../../utils/formatedCount';
import MessageTime from '../MessageTime';
import ModalEditMessage from '../Modal/ModalEditMessage';
import AudioLine from './AudioLine';
import { IAudioMessage } from './AudioMessage.interface';

const AudioMessage: FC<IAudioMessage> = ({
  id,
  seconds,
  time,
  type,
  nextType,
  prevType,
  isViewed,
  isListened,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const bgImage = useAppSelector((state) => state.config.bgImage);
  const theme = useAppSelector((state) => state.theme.theme);

  const hours = Math.floor(seconds / 60 / 60);
  const min = Math.floor(seconds / 60) - hours * 60;
  const sec = seconds % 60;

  const formatted = useMemo(
    () => [min.toString().padStart(1, '0'), sec.toString().padStart(2, '0')].join(':'),
    [sec, min],
  );

  const typeClassName = useMemo(() => {
    if (type === 'owner') {
      return 'ml-auto';
    }
  }, [type]);

  const isNextType = nextType === type;
  const isPrevType = prevType !== type;

  const classNameNextType = useMemo(() => {
    if (isNextType) {
      return 'mt-[1px]';
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

  const classNamePrevTypeTail = useMemo(() => {
    if (isPrevType && type === 'owner') {
      return '-right-1 -bottom-[4px]';
    }

    return '-left-1 -bottom-[4px] -scale-x-100';
  }, [isPrevType, type]);

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

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const classNameTimeIsListened = useMemo(() => {
    if (type === 'owner' && theme === 'light') {
      return 'text-white';
    }

    return 'text-[#ADADAD]';
  }, [type, theme]);

  return (
    <>
      <div
        aria-hidden={true}
        onClick={handleOpenModal}
        className={`relative rounded-[13px] pt-[7.58px] pl-[7.58px] pb-[2.5px] pr-[13px] max-w-[282px] w-fit text-[8.56px] ${isOwner} ${typeClassName} ${classNameNextType} ${classNameRounded()}`}
      >
        <div className='flex gap-[6.24px] items-center'>
          <PlayIcon type={type} />
          <div className='flex flex-col gap-1'>
            <AudioLine
              count={formatedCount(seconds)}
              type={type}
              isListened={isListened}
            />
            <div className={`flex items-center gap-1 ${classNameTimeIsListened}`}>
              <span>{formatted}</span>
              {!isListened && (
                <div className='translate-x-[1px]'>
                  <DotIcon type={type} />
                </div>
              )}
            </div>
          </div>
        </div>
        <MessageTime
          className='!p-0 translate-x-[6.63px] -translate-y-[1px]'
          type={type}
          time={time}
          isViewed={isViewed}
        />
        {isPrevType && (
          <div className={`absolute -bottom-[4px] ${classNamePrevTypeTail}`}>
            <TailIcon type={type} />
          </div>
        )}
      </div>
      <ModalEditMessage
        id={id}
        type={type}
        time={time}
        isViewed={isViewed}
        isListened={isListened}
        isOpneModal={isOpenModal}
        setIsOpneModal={setIsOpenModal}
        seconds={seconds}
      />
    </>
  );
};

export default AudioMessage;
