import { FC, Fragment, memo, useCallback } from 'react';

import BattaryIcon from '../../../assets/icons/BattaryIcon';
import WaterMarkIcon from '../../../assets/icons/WaterMarkIcon';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Message } from '../../../redux/state/chatSlice';
import EthernetHeader from '../../EthernetHeader';
import GeoHandler from '../../GeoHandler';
import MessageChat from '../../MessageChat/MessageChat';
import MessageSticker from '../../MessageSticker/MessageSticker';
import MessageTime from '../../MessageTime/MessageTime';
import NetworkHeader from '../../NetworkHeader/NetworkHeader';
import PhoneSpum from '../PhoneSpum';
import PhoneUserInfo from '../PhoneUserInfo';

const PhoneHeader: FC = () => {
  const volumeBattary = useAppSelector((state) => state.config.volumeBattary);
  const time = useAppSelector((state) => state.config.time);
  const spum = useAppSelector((state) => state.config.spum);
  const watermark = useAppSelector((state) => state.config.watermark);
  const geo = useAppSelector((state) => state.config.geo);
  const isCharge = useAppSelector((state) => state.config.isCharge);
  const isEconom = useAppSelector((state) => state.config.isEconom);
  const data = useAppSelector((state) => state.chat.data);
  const blurMessage = useAppSelector((state) => state.chat.blurMessage);

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
    <div className='absolute top-0 left-0 w-full z-[11] overflow-hidden h-[72px] bg-[#F6F6F6]/75 backdrop-blur-[100px]'>
      {/* <div className='absolute blur-[10px] z-0 top-0 left-0 w-[calc(100%+100px)] h-[calc(100%+50px)] -translate-x-[50px] -translate-y-[25px] bg-[#F6F6F6]/95' /> */}
      {/* TODO: переписать */}
      {/* <div className={`flex flex-col-reverse`}>
        {blurMessage?.map((el, index) => {
          const item = data[el.index];

          return (
            <Fragment key={item.id}>
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
                      className={`absolute  z-20`}
                      style={{
                        top: el.top,
                      }}
                    />
                  )}
                  {item.sticker && (
                    <div
                      className={`w-40 h-40 mt-[7px] blur-[20px] z-0 absolute ${
                        item.type === 'owner' ? 'ml-auto' : ''
                      }`}
                      style={{
                        top: el.top,
                      }}
                    >
                      <img
                        className='w-full h-full object-cover'
                        src={item.sticker}
                        alt=''
                      />
                      <div className='absolute bottom-[6px] right-1'>
                        <MessageTime
                          isViewed={item.isViewed}
                          type={item.type}
                          time={time}
                          isBackground
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </Fragment>
          );
        })}
      </div> */}
      <div className='h-[34px] pl-[18px] pr-3 pt-[3px] flex justify-between items-center text-xs font-semibold text-[#171717] relative'>
        <div
          className={`flex items-center gap-[3px] text-[14px] -mt-[1px] ${
            geo === undefined ? 'ml-[6px]' : ''
          }`}
        >
          <span>{time}</span>
          <GeoHandler />
        </div>
        {watermark && (
          <div className='absolute top-1 left-1/2 -translate-x-1/2'>
            <WaterMarkIcon />
          </div>
        )}

        <div className='mt-[3px] flex items-center gap-[3px]'>
          <NetworkHeader />
          <EthernetHeader />
          <BattaryIcon isCharge={isCharge} isEconom={isEconom} size={volumeBattary} />
        </div>
      </div>
      <PhoneUserInfo />
      {spum && <PhoneSpum />}
    </div>
  );
};

export default memo(PhoneHeader);
