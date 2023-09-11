import { FC, memo, useEffect, useRef, useState } from 'react';

import BattaryIcon from '../../../assets/icons/BattaryIcon';
import DividerIcon from '../../../assets/icons/DividerIcon';
import WaterMarkIcon from '../../../assets/icons/WaterMarkIcon';
import { useAppSelector } from '../../../hooks/useAppSelector';
import EthernetHeader from '../../EthernetHeader';
import GeoHandler from '../../GeoHandler';
import NetworkHeader from '../../NetworkHeader';
import PhoneSpum from '../PhoneSpum';
import PhoneUserInfo from '../PhoneUserInfo';

const PhoneHeader: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1);

  const volumeBattary = useAppSelector((state) => state.config.volumeBattary);
  const time = useAppSelector((state) => state.config.time);
  const spum = useAppSelector((state) => state.config.spum);
  const watermark = useAppSelector((state) => state.config.watermark);
  const geo = useAppSelector((state) => state.config.geo);
  const isCharge = useAppSelector((state) => state.config.isCharge);
  const isEconom = useAppSelector((state) => state.config.isEconom);
  const ethernet = useAppSelector((state) => state.config.ethernet);

  useEffect(() => {
    if (!ref.current) return;

    setWidth(ref.current.clientWidth);
  }, [ref.current]);

  return (
    <div
      ref={ref}
      className='absolute top-0 left-0 w-full z-[11] bg-[#F1F2F3]/75 dark:bg-[#1A1A1A]/75 backdrop-blur-[100px]'
    >
      <div className='h-[34px] pl-[17px] pr-3 pt-[3px] flex justify-between items-center text-xs font-semibold text-[#171717] dark:text-white relative'>
        <div
          className={`flex items-center gap-[2px] text-[12px] pt-[2px] ${
            geo === undefined ? 'ml-[6px]' : ''
          }`}
        >
          <span>{time}</span>
          <GeoHandler />
        </div>
        {watermark && (
          <div className='absolute top-[2.5px] left-1/2 -translate-x-1/2'>
            <WaterMarkIcon />
          </div>
        )}

        <div className='mt-[1px] pr-[1px] flex items-center gap-[3px]'>
          <NetworkHeader className={ethernet === 'x' ? '-translate-x-[1px]' : ''} />
          <EthernetHeader />
          <BattaryIcon isCharge={isCharge} isEconom={isEconom} size={volumeBattary} />
        </div>
      </div>
      <PhoneUserInfo />
      <DividerIcon width={width} />
      {spum && (
        <>
          <PhoneSpum />
          <DividerIcon width={width} />
        </>
      )}
    </div>
  );
};

export default memo(PhoneHeader);
