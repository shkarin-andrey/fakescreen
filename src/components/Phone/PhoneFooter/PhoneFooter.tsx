import { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import AttachIcon from '../../../assets/icons/AttachIcon';
import RecordAudioImage from '../../../assets/icons/RecordAudioImage';
import StickersIcon from '../../../assets/icons/StickersIcon';

const PhoneFooter: FC = () => {
  return (
    <div className='w-full pl-[6px] pb-[7px] pr-[10px] bg-[#F6F6F6] border-t border-0 border-solid border-[#E8E8E8]'>
      <div className='flex items-center gap-1 pt-[4px] pb-[3px]'>
        <AttachIcon />
        <div className='flex items-center justify-between h-[26px] pl-[11px] pr-[7px] border-[0.2px] border-[#E8E8E8] border-solid rounded-[14px] bg-white w-full'>
          <span className='text-[#BFBFBF] text-sm mb-[3px]'>
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

export default memo(PhoneFooter);
