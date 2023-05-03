import { FC, memo } from 'react';

import CloseIcon from '../../../assets/icons/CloseIcon';

const PhoneSpum: FC = () => {
  return (
    <div className='bg-white h-[34px] pr-[21px] flex items-center justify-center gap-[48px] relative'>
      <span className='text-red-500 text-sm tracking-[0.3px]'>Заблокировать</span>
      <span className='text-blue-400 text-sm tracking-[0.3px]'>Добавить</span>
      <div className='absolute right-[9px] flex'>
        <CloseIcon />
      </div>
    </div>
  );
};

export default memo(PhoneSpum);
