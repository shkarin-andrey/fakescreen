import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setWatermark } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsPhoneWatermark: FC = () => {
  const dispatch = useAppDispatch();
  const { watermark } = useAppSelector((state) => state.config);

  const handleChangeTime = (e: CheckboxChangeEvent) => {
    dispatch(setWatermark(e.target.checked));
  };

  return (
    <Wrapper title='Watermark телеграм:'>
      <Checkbox onChange={handleChangeTime} checked={watermark} />
    </Wrapper>
  );
};

export default SettingsPhoneWatermark;
