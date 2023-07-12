import { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import AttachIcon from '../../../assets/icons/AttachIcon';
import RecordAudioImage from '../../../assets/icons/RecordAudioImage';
import StickersIcon from '../../../assets/icons/StickersIcon';

const PhoneFooter: FC = () => {
  return (
    <div className='w-full pl-[5px] pb-[7px] pr-[9px] bg-[#FFFFFF]/75 dark:bg-black/75 backdrop-blur-[69px] border-t border-0 border-solid border-[#E8E8E8]/75 dark:border-[#2E2E30]/75'>
      <div className='flex items-center gap-[2px] pt-[4px] pb-[3px]'>
        <AttachIcon />
        <div className='flex items-center justify-between h-[26px] pl-[10px] pr-[7px] border-[0.2px] border-[#E8E8E8] dark:border-[#1D1D1D] border-solid rounded-[14px] bg-white dark:bg-[#060606] w-full'>
          <span className='text-[#BFBFBF] dark:text-[#7B7B7B] -tracking-[0.38px] text-[13px] mb-[3px]'>
            <FormattedMessage id='footer_phone_message' />
          </span>
          <StickersIcon />
        </div>
        <div className='ml-1'>
          <RecordAudioImage />
        </div>
      </div>
      <div className='bg-[#060606] dark:bg-white w-[115px] h-1 rounded-3xl mx-auto mt-[17px]'></div>
    </div>
  );
};

export default memo(PhoneFooter);
