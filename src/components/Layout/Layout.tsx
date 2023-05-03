import { GlobalOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { FC, memo, useCallback } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { LOCALES } from '../../i18n/locales';
import { setLanguage } from '../../redux/state/languageSlice';
import { ILayout } from './Layout.interface';

const local = Object.values(LOCALES);

const Layout: FC<ILayout> = ({ children }) => {
  const dispatch = useAppDispatch();

  const descritpion = useCallback((lang: string) => {
    return lang.split('-')[1];
  }, []);

  const handleClick = useCallback((lang: string) => {
    dispatch(setLanguage(lang));
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen py-12'>
      <div className='container mx-auto'>{children}</div>
      <FloatButton.Group
        trigger='hover'
        type='primary'
        style={{ right: 20, bottom: 100, zIndex: 0 }}
        icon={<GlobalOutlined />}
      >
        {local.map((lang) => (
          <FloatButton
            key={lang}
            description={descritpion(lang)}
            onClick={() => handleClick(lang)}
          />
        ))}
      </FloatButton.Group>
    </div>
  );
};

export default memo(Layout);
