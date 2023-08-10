import { FC, memo } from 'react';

import { IWrapper } from './Wrapper.interface';

const Wrapper: FC<IWrapper> = ({ children, title }) => {
  return (
    // <div className='flex gap-4'>
    //   <div className='font-medium text-base'>{title}</div>
    //   {children}
    // </div>
    <div className='px-6 py-4 rounded-lg bg-white'>
      <div className='text-base font-medium'>{title}</div>
      {children}
    </div>
  );
};

export default memo(Wrapper);
