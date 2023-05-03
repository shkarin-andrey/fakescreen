import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FC, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setWatermark } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsPhoneWatermark: FC = () => {
  const dispatch = useAppDispatch();
  const watermark = useAppSelector((state) => state.config.watermark);

  const handleChangeTime = useCallback((e: CheckboxChangeEvent) => {
    dispatch(setWatermark(e.target.checked));
  }, []);

  return (
    <Wrapper title='Watermark телеграм:'>
      <Checkbox onChange={handleChangeTime} checked={watermark} />
    </Wrapper>
  );
};

export default SettingsPhoneWatermark;
