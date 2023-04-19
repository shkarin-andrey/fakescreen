import { FC } from 'react';

import { ILayout } from './Layout.interface';

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className='bg-gray-100 min-h-screen py-12'>
      <div className='container mx-auto'>{children}</div>
    </div>
  );
};

export default Layout;
