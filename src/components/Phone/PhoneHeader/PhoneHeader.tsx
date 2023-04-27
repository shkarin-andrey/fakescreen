import { FC } from 'react';

import BattaryIcon from '../../../assets/icons/BattaryIcon';
import WaterMarkIcon from '../../../assets/icons/WaterMarkIcon';
import { useAppSelector } from '../../../hooks/useAppSelector';
import EthernetHeader from '../../EthernetHeader';
import GeoHandler from '../../GeoHandler';
import NetworkHeader from '../../NetworkHeader/NetworkHeader';
import PhoneSpum from '../PhoneSpum';
import PhoneUserInfo from '../PhoneUserInfo';

const PhoneHeader: FC = () => {
  const { volumeBattary, time, spum, watermark, geo, isCharge, isEconom } =
    useAppSelector((state) => state.config);

  return (
    <>
      <div className='w-full bg-[#F6F6F6] h-[34px] pl-[18px] pr-3 pt-[3px] flex justify-between items-center text-xs font-semibold text-[#171717] relative'>
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

        <div className='mt-[3px] flex items-center gap-[2px]'>
          <NetworkHeader />
          <EthernetHeader />
          <BattaryIcon isCharge={isCharge} isEconom={isEconom} size={volumeBattary} />
        </div>
      </div>
      <PhoneUserInfo />
      {spum && <PhoneSpum />}
    </>
  );
};

export default PhoneHeader;
