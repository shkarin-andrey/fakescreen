import { FC, memo } from 'react';

import Navigate from '../Navigate';
import Phone from '../Phone';
import { ILayout } from './Layout.interface';

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className='bg-gray-100 overflow-hidden h-screen'>
      <div className='w-[1280px] mx-auto'>
        <div className='flex justify-between'>
          <div className='w-[315px] py-5'>
            <Navigate />
          </div>
          <div className='w-[500px] absolute left-1/2 -translate-x-[56%] overflow-scroll h-screen py-5'>
            {children}
          </div>
          <div className='w-[376px] py-5'>
            <Phone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Layout);
