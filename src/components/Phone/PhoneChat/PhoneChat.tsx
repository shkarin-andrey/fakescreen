import { FC, Fragment, useCallback } from 'react';

import { useAppSelector } from '../../../hooks/useAppSelector';
import type { Message } from '../../../redux/state/chatSlice';
import MessageChat from '../../MessageChat';
import MessageTime from '../../MessageTime';

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
      <div className='w-full h-full px-[9px] py-[7px] overflow-y-scroll flex flex-col-reverse scrollbar scrollbar-thumb-[#B1B1B1] scrollbar-track-transparent scrollbar-small'>
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
                  <div
                    className={`w-40 h-40 relative mt-[7px] ${
                      item.type === 'owner' ? 'ml-auto' : ''
                    }`}
                  >
                    <img
                      className='w-full h-full object-cover'
                      src={item.sticker}
                      alt=''
                    />
                    <div className='absolute bottom-[6px] -right-1'>
                      <MessageTime
                        isViewed={item.isViewed}
                        type={item.type}
                        time={item.time}
                        isBackground
                      />
                    </div>
                  </div>
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
