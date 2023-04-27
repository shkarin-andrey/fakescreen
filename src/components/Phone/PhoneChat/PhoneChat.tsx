import { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';

import GoDownButtonIcon from '../../../assets/icons/GoDownButtonIcon';
import { useAppSelector } from '../../../hooks/useAppSelector';
import type { Message } from '../../../redux/state/chatSlice';
import MessageChat from '../../MessageChat';
import MessageSticker from '../../MessageSticker';
import TimeChat from '../../TimeChat';

const PhoneChat: FC = () => {
  const { bgImage } = useAppSelector((state) => state.config);
  const { data } = useAppSelector((state) => state.chat);
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(false);

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

  useEffect(() => {
    if (ref.current && ref.current.clientHeight < ref.current.scrollHeight) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, [ref.current?.scrollHeight]);

  return (
    <div
      className='relative flex-1 overflow-hidden z-10'
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div
        ref={ref}
        className='chat w-full h-full px-[9px] py-[7px] overflow-y-scroll flex flex-col-reverse scrollbar scrollbar-thumb-transparent scrollbar-track-transparent scrollbar-small'
      >
        {data.map((item, index) => (
          <Fragment key={item.id}>
            {'chatTime' in item && <TimeChat id={item.id} chatTime={item.chatTime} />}
            {'type' in item && (
              <>
                {item.message && (
                  <MessageChat
                    id={item.id}
                    type={item.type}
                    message={item.message}
                    time={item.time}
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
        <div className='absolute bottom-[5px] right-[5px]'>
          <GoDownButtonIcon />
        </div>
      )}
    </div>
  );
};

export default PhoneChat;
