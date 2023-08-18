import { FC, Fragment, memo, useCallback, useRef, useState } from 'react';

import GoDownButtonIcon from '../../../assets/icons/GoDownButtonIcon';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { type Message } from '../../../redux/state/chatSlice';
import AudioMessage from '../../AudioMessage';
import MessageChat from '../../MessageChat';
import MessageSticker from '../../MessageSticker';
import TimeChat from '../../TimeChat';

const PhoneChat: FC = () => {
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
    if (e.target.scrollTop < -30) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, []);

  return (
    <>
      <div
        ref={chatRef}
        onScroll={handleScroll}
        className={`chat w-full h-full pl-[9px] pr-[5px] pb-[7px] pt-[79px] flex flex-col-reverse scrollbar scrollbar-thumb-transparent scrollbar-track-transparent scrollbar-small overflow-y-scroll z-10`}
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
                {item.audioMessage && (
                  <AudioMessage
                    id={item.id}
                    seconds={item.audioMessage}
                    audioList={item.audioList}
                    time={item.time}
                    type={item.type}
                    isViewed={item.isViewed}
                    isListened={item.isListened}
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
        <div className='z-[11] absolute bottom-[61px] right-[3px]'>
          <GoDownButtonIcon />
        </div>
      )}
    </>
  );
};

export default memo(PhoneChat);
