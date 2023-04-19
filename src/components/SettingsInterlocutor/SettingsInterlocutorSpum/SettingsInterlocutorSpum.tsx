import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setSpum } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsInterlocutorSpum: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeSpum = (e: CheckboxChangeEvent) => {
    dispatch(setSpum(e.target.checked));
  };

  return (
    <Wrapper title='Спам:'>
      <Checkbox onChange={handleChangeSpum} />
    </Wrapper>
  );
};

export default SettingsInterlocutorSpum;
