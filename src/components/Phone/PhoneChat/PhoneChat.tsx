// eslint-disable-next-line simple-import-sort/imports
import update from 'immutability-helper';
import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import GoDownButtonIcon from '../../../assets/icons/GoDownButtonIcon';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setGlobalChat, type Message } from '../../../redux/state/chatSlice';
import AudioMessage from '../../AudioMessage';
import DnDWrapper from '../../DnDWrapper';
import MessageChat from '../../MessageChat';
import MessageSticker from '../../MessageSticker';
import TimeChat from '../../TimeChat';

const PhoneChat: FC = () => {
  const data = useAppSelector((state) => state.chat.data);
  const [scroll, setScroll] = useState(false);
  const dispatch = useDispatch();

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

  const moveCard = useCallback(
    (draggedId: string, id: string) => {
      if (draggedId !== id) {
        const cardIndex = data.findIndex((item) => item.id === id);
        const afterIndex = data.findIndex((item) => item.id === draggedId);

        const updateData = update(data, {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, data[cardIndex]],
          ],
        });
        dispatch(
          setGlobalChat({
            data: updateData,
          }),
        );
      }
    },
    [data],
  );

  return (
    <>
      <div
        onScroll={handleScroll}
        className={`chat w-full h-full pl-[8px] pr-[8px] pb-[7px] pt-[79px] flex flex-col-reverse scrollbar scrollbar-small overflow-y-scroll z-10`}
      >
        {data.map((item, index) => (
          <DnDWrapper key={item.id} id={item.id} moveCard={moveCard} index={index}>
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
                    fileList={item?.fileList}
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
          </DnDWrapper>
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

export default PhoneChat;
