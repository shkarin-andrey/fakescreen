import { FC, useCallback, useMemo } from 'react';

import DownloadIcon from '../../assets/icons/DownloadIcon';
import TailIcon from '../../assets/icons/TailIcon';
import { useAppSelector } from '../../hooks/useAppSelector';
import { formatedCount } from '../../utils/formatedCount';
import MessageTime from '../MessageTime';
import AudioLine from './AudioLine';
import { IAudioMessage } from './AudioMessage.interface';

const AudioMessage: FC<IAudioMessage> = ({
  seconds,
  time,
  type,
  nextType,
  prevType,
  isViewed,
}) => {
  const bgImage = useAppSelector((state) => state.config.bgImage);

  const hours = Math.floor(seconds / 60 / 60);
  const min = Math.floor(seconds / 60) - hours * 60;
  const sec = seconds % 60;

  const formatted = useMemo(
    () => [min.toString().padStart(2, '0'), sec.toString().padStart(2, '0')].join(':'),
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

  return (
    <div
      className={`relative ${isOwner} rounded-[13px] mt-[2px] pt-[8.58px] pl-[8.58px] pb-[3.5px] pr-[13.26px] max-w-[278px] w-fit text-[8.56px] ${typeClassName} ${classNameNextType} ${classNameRounded()}`}
    >
      <div className='flex gap-[6.24px] items-center'>
        <DownloadIcon />
        <div className='flex flex-col gap-1'>
          <AudioLine count={formatedCount(seconds)} />
          <div className='text-[#ADADAD] flex items-center gap-1'>
            <span>{formatted}</span>
            <div className='w-[3.12px] h-[3.12px] rounded-full bg-[#5286EF]'></div>
          </div>
        </div>
      </div>
      <MessageTime
        className='!p-0 translate-x-[6.63px]'
        type={type}
        time={time}
        isViewed={isViewed}
      />
      {isPrevType && (
        <div className={`absolute -bottom-[6px] ${classNamePrevTypeTail}`}>
          <TailIcon type={type} />
        </div>
      )}
    </div>
  );
};

export default AudioMessage;
