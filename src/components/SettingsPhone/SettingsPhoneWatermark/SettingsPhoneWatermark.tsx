import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FC, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setWatermark } from '../../../redux/state/configSlice';

const SettingsPhoneWatermark: FC = () => {
  const dispatch = useAppDispatch();
  const watermark = useAppSelector((state) => state.config.watermark);

  const handleChangeTime = useCallback((e: CheckboxChangeEvent) => {
    dispatch(setWatermark(e.target.checked));
  }, []);

  return (
    <div className='px-6 py-4 rounded-lg bg-white flex items-center gap-4'>
      <div className='text-base font-medium'>Watermark телеграм</div>
      <Checkbox onChange={handleChangeTime} checked={watermark} />
    </div>
  );
};

export default SettingsPhoneWatermark;
