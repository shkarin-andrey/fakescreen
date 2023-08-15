import { Radio, RadioChangeEvent } from 'antd';
import { FC, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { LOCALES } from '../../../i18n/locales';
import { setLanguage } from '../../../redux/state/languageSlice';

const SettingsPhoneLocal: FC = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language.language);
  const local = Object.values(LOCALES);

  const handleChangeGeo = useCallback((e: RadioChangeEvent) => {
    dispatch(setLanguage(e.target.value));
  }, []);

  return (
    <div className='px-6 py-4 rounded-lg bg-white flex items-center gap-4'>
      <div className='text-base font-medium'>Локализация</div>
      <Radio.Group onChange={handleChangeGeo} defaultValue={language} className='flex'>
        {local.map((item) => (
          <Radio.Button
            key={item.value}
            value={item.value}
            className='flex justify-center items-center'
          >
            {item.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

export default SettingsPhoneLocal;
