import { GlobalOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { FC } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { LOCALES } from '../../i18n/locales';
import { setLanguage } from '../../redux/state/languageSlice';
import { ILayout } from './Layout.interface';

const Layout: FC<ILayout> = ({ children }) => {
  const local = Object.values(LOCALES);

  const dispatch = useAppDispatch();

  return (
    <div className='bg-gray-100 min-h-screen py-12'>
      <div className='container mx-auto'>{children}</div>
      <FloatButton.Group
        trigger='hover'
        type='primary'
        style={{ left: 24 }}
        icon={<GlobalOutlined />}
      >
        {local.map((lang) => (
          <FloatButton
            key={lang}
            description={lang.split('-')[1]}
            onClick={() => dispatch(setLanguage(lang))}
          />
        ))}
      </FloatButton.Group>
    </div>
  );
};

export default Layout;
