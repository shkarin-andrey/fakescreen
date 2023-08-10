import { Radio, RadioChangeEvent } from 'antd';
import { FC, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setWifi } from '../../../redux/state/configSlice';
import { itemsWifi } from './SettingsPhoneWifi.config';

const SettingsPhoneWifi: FC = () => {
  const dispatch = useAppDispatch();
  const wifi = useAppSelector((state) => state.config.wifi);

  const handleChangeWifi = useCallback((e: RadioChangeEvent) => {
    dispatch(setWifi(e.target.value));
  }, []);

  return (
    <>
      <div className='text-sm mb-2'>Состояние Wi-Fi</div>
      <Radio.Group onChange={handleChangeWifi} value={wifi}>
        {itemsWifi.map((item) => (
          <Radio.Button key={item.value} value={item.value}>
            {item.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </>
  );
};

export default SettingsPhoneWifi;
