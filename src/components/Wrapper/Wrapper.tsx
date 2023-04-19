import { FC } from 'react';

import { IWrapper } from './Wrapper.interface';

const Wrapper: FC<IWrapper> = ({ children, title }) => {
  return (
    <div className='flex gap-4'>
      <div className='font-medium text-base'>{title}</div>
      {children}
    </div>
  );
};

export default Wrapper;
