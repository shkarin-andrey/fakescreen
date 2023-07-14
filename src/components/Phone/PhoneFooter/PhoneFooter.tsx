import { FC, memo, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import AttachIcon from '../../../assets/icons/AttachIcon';
import RecordAudioImage from '../../../assets/icons/RecordAudioImage';
import StickersIcon from '../../../assets/icons/StickersIcon';
import { useAppSelector } from '../../../hooks/useAppSelector';

const PhoneFooter: FC = () => {
  const bgImage = useAppSelector((state) => state.config.bgImage);

  const isBorder = useMemo(() => {
    if (bgImage === '/src/assets/images/bg-chat/pattern-12.jpg') {
      return;
    }

    return 'border-t-[0.1px] border-0 border-solid border-[#E8E8E8]/75 dark:border-[#2E2E30]/75';
  }, [bgImage]);

  return (
    <div
      className={`w-full pl-[4px] pb-[7px] pr-[8px] bg-[#FFFFFF]/75 dark:bg-black/75 backdrop-blur-[69px] ${isBorder}`}
    >
      <div className='flex items-center gap-[2px] pt-[4px] pb-[3px]'>
        <AttachIcon />
        <div className='relative flex items-center h-[26px] pl-[10px] pr-[7px] border-[0.2px] border-[#E8E8E8] dark:border-[#1D1D1D] border-solid rounded-[14px] bg-white dark:bg-[#060606] w-full'>
          <span className='text-[#BFBFBF] dark:text-[#7B7B7B] -tracking-[0.4px] text-[13px]'>
            <FormattedMessage id='footer_phone_message' />
          </span>
          <div className='absolute right-[6px] top-[4px]'>
            <StickersIcon />
          </div>
        </div>
        <div className='ml-[5px] mt-[1px]'>
          <RecordAudioImage />
        </div>
      </div>
      <div className='bg-[#060606] dark:bg-white w-[115px] h-1 rounded-3xl mx-auto mt-[17px]'></div>
    </div>
  );
};

export default memo(PhoneFooter);
