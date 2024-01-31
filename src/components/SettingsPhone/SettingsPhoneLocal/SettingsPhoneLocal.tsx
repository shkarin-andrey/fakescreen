import { Select } from 'antd';
import { FC, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { LOCALES } from '../../../i18n/locales';
import { setLanguage } from '../../../redux/state/languageSlice';

const SettingsPhoneLocal: FC = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language.language);
  const local = Object.values(LOCALES);

  const handleChangeGeo = useCallback((value: string) => {
    dispatch(setLanguage(value));
  }, []);

  return (
    <div className='px-6 py-4 rounded-lg bg-white flex items-center gap-4'>
      <div className='text-base font-medium'>Локализация</div>
      <Select onChange={handleChangeGeo} options={local} defaultValue={language} />
    </div>
  );
};

export default SettingsPhoneLocal;
