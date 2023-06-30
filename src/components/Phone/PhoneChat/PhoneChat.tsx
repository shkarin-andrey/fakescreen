import { FC, Fragment, memo, useCallback, useRef, useState } from 'react';

import GoDownButtonIcon from '../../../assets/icons/GoDownButtonIcon';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { type Message, setBlurMessage } from '../../../redux/state/chatSlice';
import MessageChat from '../../MessageChat';
import MessageSticker from '../../MessageSticker';
import TimeChat from '../../TimeChat';
import { IPhoneChat } from './PhoneChat.interface';

const PhoneChat: FC<IPhoneChat> = ({ className }) => {
  const dispatch = useAppDispatch();
  const bgImage = useAppSelector((state) => state.config.bgImage);
  const data = useAppSelector((state) => state.chat.data);
  const [scroll, setScroll] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const prevType = useCallback(
    (index: number): Message['type'] | null => {
      const prevItem = data[index - 1];

      if (index !== 0 && 'type' in prevItem) {
        return prevItem.type;
      }

      return null;
    },
    [data],
  );

  const nextType = useCallback(
    (index: number): Message['type'] | null => {
      const nextItem = data[index + 1];

      if (index !== data.length - 1 && 'type' in nextItem) {
        return nextItem.type;
      }

      return null;
    },
    [data],
  );

  const handleScroll = useCallback((e: any) => {
    dispatch(setBlurMessage([]));
    const arr: any[] = [];
    e.target.childNodes.forEach((el: any, index: number) => {
      const coords = el.getBoundingClientRect();
      console.log(coords);

      if (coords.top < 150 && coords.top > 0) {
        arr.push({
          top: coords.top,
          index,
        });
      }
    });

    dispatch(setBlurMessage(arr));

    if (e.target.scrollTop < -30) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, []);

  return (
    <div
      className='relative flex-1 overflow-hidden z-10 h-full w-full'
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div
        ref={chatRef}
        onScroll={handleScroll}
        className={`chat w-full h-full pl-[9px] pr-[5px] pb-[7px] pt-[79px] flex flex-col-reverse scrollbar scrollbar-thumb-transparent scrollbar-track-transparent scrollbar-small ${className}`}
      >
        {data.map((item, index) => (
          <Fragment key={item.id}>
            {'chatTime' in item && <TimeChat id={item.id} chatTime={item.chatTime} />}
            {'type' in item && (
              <>
                {(item.message || item.image) && (
                  <MessageChat
                    id={item.id}
                    type={item.type}
                    message={item.message}
                    time={item.time}
                    image={item.image}
                    isViewed={item.isViewed}
                    prevType={prevType(index)}
                    nextType={nextType(index)}
                  />
                )}
                {item.sticker && (
                  <MessageSticker
                    id={item.id}
                    isViewed={item.isViewed}
                    type={item.type}
                    sticker={item.sticker}
                    time={item.time}
                  />
                )}
              </>
            )}
          </Fragment>
        ))}
      </div>
      {scroll && (
        <div className='absolute -bottom-[2px] right-[2px]'>
          <GoDownButtonIcon />
        </div>
      )}
    </div>
  );
};

export default memo(PhoneChat);
