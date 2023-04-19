import { FC } from 'react';

import BattaryIcon from '../../../assets/icons/BattaryIcon';
import telegram from '../../../assets/images/telegram.png';
import { useAppSelector } from '../../../hooks/useAppSelector';
import EthernetHeader from '../../EthernetHeader';
import GeoHandler from '../../GeoHandler';
import NetworkHeader from '../../NetworkHeader/NetworkHeader';
import PhoneSpum from '../PhoneSpum';
import PhoneUserInfo from '../PhoneUserInfo';

const PhoneHeader: FC = () => {
  const { volumeBattary, time, spum } = useAppSelector((state) => state.config);

  return (
    <>
      <div className='w-full bg-[#F6F6F6] h-[38px] pl-[18px] pr-3 flex justify-between items-center text-xs font-semibold text-[#171717] relative'>
        <div className='flex items-center gap-1'>
          <span>{time}</span>
          <GeoHandler />
        </div>
        <div className='absolute top-1 left-1/2 -translate-x-1/2 w-[71px] h-[17px]'>
          <img src={telegram} alt='telegram' className='w-full h-full' />
        </div>
        <div className='flex items-center gap-1'>
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
