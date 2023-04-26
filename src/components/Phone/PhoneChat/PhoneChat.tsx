import { FC, Fragment, useCallback } from 'react';

import { useAppSelector } from '../../../hooks/useAppSelector';
import type { Message } from '../../../redux/state/chatSlice';
import MessageChat from '../../MessageChat';
import MessageSticker from '../../MessageSticker';

const PhoneChat: FC = () => {
  const { bgImage } = useAppSelector((state) => state.config);
  const { data } = useAppSelector((state) => state.chat);

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

  return (
    <div
      className='flex-1 overflow-hidden z-10'
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className='chat w-full h-full px-[9px] py-[7px] overflow-y-scroll flex flex-col-reverse scrollbar scrollbar-thumb-transparent scrollbar-track-transparent scrollbar-small'>
        {data.map((item, index) => (
          <Fragment key={item.id}>
            {'chatTime' in item && (
              <div className='bg-[#72839166] rounded-[27px] px-[6px] py-[2px] text-white text-xs w-fit mx-auto mt-[13px]'>
                {item.chatTime}
              </div>
            )}
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
    </div>
  );
};

export default PhoneChat;
