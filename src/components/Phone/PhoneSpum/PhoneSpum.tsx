import { FC } from 'react';

import CloseIcon from '../../../assets/icons/CloseIcon';

const PhoneSpum: FC = () => {
  return (
    <div className='bg-white h-[34px] flex items-center justify-center gap-[46px] relative drop-shadow-[0px_-0.2px_0.5px_rgba(0,0,0,0.13)]'>
      <span className='text-red-500 text-sm'>Заблокировать</span>
      <span className='text-blue-400 text-sm'>Добавить</span>
      <div className='absolute right-[10px]'>
        <CloseIcon />
      </div>
    </div>
  );
};

export default PhoneSpum;
