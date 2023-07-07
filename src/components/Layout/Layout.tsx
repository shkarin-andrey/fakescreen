import { EyeInvisibleOutlined, EyeOutlined, GlobalOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { FC, memo, useCallback } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { LOCALES } from '../../i18n/locales';
import { setLanguage } from '../../redux/state/languageSlice';
import { setTheme, type TTheme } from '../../redux/state/themeState';
import { ILayout } from './Layout.interface';

const local = Object.values(LOCALES);

const Layout: FC<ILayout> = ({ children }) => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.theme.theme);

  const descritpion = useCallback((lang: string) => {
    return lang.split('-')[1];
  }, []);

  const handleClick = useCallback((lang: string) => {
    dispatch(setLanguage(lang));
  }, []);

  const handleSelectTheme = useCallback(
    (selectTheme: TTheme) => {
      if (theme === selectTheme) return;

      dispatch(setTheme(selectTheme));
    },
    [theme],
  );

  return (
    <div className='bg-gray-100 min-h-screen py-12'>
      <div className='container mx-auto'>{children}</div>
      <FloatButton.Group
        trigger='click'
        type='primary'
        style={{ right: 20, bottom: 104, zIndex: 101 }}
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
      <FloatButton.Group
        trigger='click'
        type='primary'
        style={{ right: 20, bottom: 160, zIndex: 100 }}
        icon={<EyeOutlined />}
      >
        <FloatButton
          key='light'
          onClick={() => handleSelectTheme('light')}
          icon={<EyeOutlined />}
          tooltip='Светлая темы'
        />
        <FloatButton
          key='dark'
          onClick={() => handleSelectTheme('dark')}
          icon={<EyeInvisibleOutlined />}
          tooltip='Темная темы'
        />
      </FloatButton.Group>
    </div>
  );
};

export default memo(Layout);
