import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setMute } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsInterlocutorMute: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeMute = (e: CheckboxChangeEvent) => {
    dispatch(setMute(e.target.checked));
  };

  return (
    <Wrapper title='Без звука:'>
      <Checkbox onChange={handleChangeMute} />
    </Wrapper>
  );
};

export default SettingsInterlocutorMute;
