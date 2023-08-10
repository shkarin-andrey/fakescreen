import { FC, memo } from 'react';

import Navigate from '../Navigate';
import Phone from '../Phone';
import { ILayout } from './Layout.interface';

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className='bg-gray-100 min-h-screen py-5'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-[315px_500px_376px] gap-11'>
          <Navigate />
          {children}
          <Phone />
        </div>
      </div>
    </div>
  );
};

export default memo(Layout);
