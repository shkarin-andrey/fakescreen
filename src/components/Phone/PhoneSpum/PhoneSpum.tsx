import { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import CloseIcon from '../../../assets/icons/CloseIcon';

const PhoneSpum: FC = () => {
  return (
    <>
      <div className='w-full h-[1px] dark:bg-[#404044]/75 bg-[#C8C7CB]/75'></div>
      <div className='h-[34px] pr-[21px] flex items-center justify-center gap-[48px] relative'>
        <span className='text-red-500 text-sm tracking-[0.3px]'>
          <FormattedMessage id='interlocutor_spum_block' />
        </span>
        <span className='text-blue-400 dark:text-white text-sm tracking-[0.3px]'>
          <FormattedMessage id='interlocutor_spum_add' />
        </span>
        <div className='absolute right-[9px] flex'>
          <CloseIcon />
        </div>
      </div>
    </>
  );
};

export default memo(PhoneSpum);
