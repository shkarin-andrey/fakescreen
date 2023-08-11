import { Radio, RadioChangeEvent } from 'antd';
import { FC, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setTheme } from '../../../redux/state/themeState';

const SettingsPhoneTheme: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const handleChangeTheme = useCallback((e: RadioChangeEvent) => {
    dispatch(setTheme(e.target.value));
  }, []);

  return (
    <div className='px-6 py-4 rounded-lg bg-white flex items-center gap-4'>
      <div className='text-base font-medium'>Тема</div>
      <Radio.Group onChange={handleChangeTheme} defaultValue={theme} className='flex'>
        <Radio.Button value='dark' className='flex justify-center items-center'>
          Темная
        </Radio.Button>
        <Radio.Button value='light' className='flex justify-center items-center'>
          Светлая
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default SettingsPhoneTheme;
