import { CloseOutlined } from '@ant-design/icons';
import { Radio, RadioChangeEvent } from 'antd';
import { FC, memo, useCallback } from 'react';

import GeoBlueIcon from '../../../assets/icons/GeoBlueIcon';
import GeoFillIcon from '../../../assets/icons/GeoFillIcon';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setGeo } from '../../../redux/state/configSlice';

const SettingsPhoneGeo: FC = () => {
  const dispatch = useAppDispatch();
  const geo = useAppSelector((state) => state.config.geo);

  const handleChangeGeo = useCallback((e: RadioChangeEvent) => {
    dispatch(setGeo(e.target.value));
  }, []);

  return (
    <div className='px-6 py-4 rounded-lg bg-white flex items-center gap-4'>
      <div className='text-base font-medium'>Геолокация</div>
      <Radio.Group onChange={handleChangeGeo} value={geo} className='flex'>
        <Radio.Button value='fill' className='flex justify-center items-center'>
          <GeoFillIcon isSettings />
        </Radio.Button>
        <Radio.Button value='blue' className='flex justify-center items-center'>
          <GeoBlueIcon />
        </Radio.Button>
        <Radio.Button className='flex justify-center items-center'>
          <CloseOutlined style={{ color: 'red' }} />
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default memo(SettingsPhoneGeo);
