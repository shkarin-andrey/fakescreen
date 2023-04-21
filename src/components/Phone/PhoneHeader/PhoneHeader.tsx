import { FC } from 'react';

import BattaryIcon from '../../../assets/icons/BattaryIcon';
import WaterMarkIcon from '../../../assets/icons/WaterMarkIcon';
import telegram from '../../../assets/images/telegram.png';
import { useAppSelector } from '../../../hooks/useAppSelector';
import EthernetHeader from '../../EthernetHeader';
import GeoHandler from '../../GeoHandler';
import NetworkHeader from '../../NetworkHeader/NetworkHeader';
import PhoneSpum from '../PhoneSpum';
import PhoneUserInfo from '../PhoneUserInfo';

const PhoneHeader: FC = () => {
  const { volumeBattary, time, spum, watermark } = useAppSelector(
    (state) => state.config,
  );

  return (
    <>
      <div className='w-full bg-[#F6F6F6] h-[38px] pl-[18px] pr-3 flex justify-between items-center text-xs font-semibold text-[#171717] relative'>
        <div className='flex items-center gap-1 ml-[11px]'>
          <span>{time}</span>
          <GeoHandler />
        </div>
        {watermark && (
          <div className='absolute top-1 left-1/2 -translate-x-1/2'>
            <WaterMarkIcon />
          </div>
        )}

        <div className='mt-[1px] flex items-center gap-[3px]'>
          <NetworkHeader />
          <EthernetHeader />
          <BattaryIcon size={volumeBattary} />
        </div>
      </div>
      <PhoneUserInfo />
      {spum && <PhoneSpum />}
    </>
  );
};

export default PhoneHeader;
