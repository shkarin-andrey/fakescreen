import { FC, memo } from 'react';

import BattaryIcon from '../../../assets/icons/BattaryIcon';
import WaterMarkIcon from '../../../assets/icons/WaterMarkIcon';
import { useAppSelector } from '../../../hooks/useAppSelector';
import EthernetHeader from '../../EthernetHeader';
import GeoHandler from '../../GeoHandler';
import NetworkHeader from '../../NetworkHeader';
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

  return (
    <div className='absolute top-0 left-0 w-full z-[11] bg-[#FFFFFF]/75 dark:bg-[#000000]/75 backdrop-blur-[100px] border-b-[0.2px] dark:border-b-[#404044] border-b-[#C8C7CB]'>
      <div className='h-[34px] pl-[17px] pr-3 pt-[3px] flex justify-between items-center text-xs font-semibold text-[#171717] dark:text-white relative'>
        <div
          className={`flex items-center gap-[3px] text-[12px] pt-[2px] ${
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
          <NetworkHeader />
          <EthernetHeader />
          <BattaryIcon isCharge={isCharge} isEconom={isEconom} size={volumeBattary} />
        </div>
      </div>
      <PhoneUserInfo />
      {spum && <PhoneSpum />}
      {/* <div className='w-full h-[1px] dark:bg-[#404044]/75 bg-[#C8C7CB]/75'></div> */}
    </div>
  );
};

export default memo(PhoneHeader);
