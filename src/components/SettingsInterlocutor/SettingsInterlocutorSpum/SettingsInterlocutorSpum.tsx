import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setSpum } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsInterlocutorSpum: FC = () => {
  const dispatch = useAppDispatch();

  const { spum } = useAppSelector((state) => state.config);

  const handleChangeSpum = (e: CheckboxChangeEvent) => {
    dispatch(setSpum(e.target.checked));
  };

  return (
    <Wrapper title='Спам:'>
      <Checkbox checked={spum} onChange={handleChangeSpum} />
    </Wrapper>
  );
};

export default SettingsInterlocutorSpum;
