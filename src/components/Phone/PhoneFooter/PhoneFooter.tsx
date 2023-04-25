import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import AttachIcon from '../../../assets/icons/AttachIcon';
import RecordAudioImage from '../../../assets/icons/RecordAudioImage';
import StickersIcon from '../../../assets/icons/StickersIcon';

const PhoneFooter: FC = () => {
  return (
    <div className='w-full pl-[6px] pb-2 pr-[10px] bg-[#F6F6F6]'>
      <div className='flex items-center gap-1 py-[5px]'>
        <AttachIcon />
        <div className='flex items-center justify-between h-7 pl-[11px] pr-[7px] border-[0.8px] border-[#d6d1d1] border-solid rounded-[14px] bg-white w-full'>
          <span className='text-[#AEAEB2] text-sm'>
            <FormattedMessage id='footer_phone_message' />
          </span>
          <StickersIcon />
        </div>
        <div className='ml-1'>
          <RecordAudioImage />
        </div>
      </div>
      <div className='bg-[#060606] w-[115px] h-1 rounded-3xl mx-auto mt-[17px]'></div>
    </div>
  );
};

export default PhoneFooter;
