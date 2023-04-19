import { Input } from 'antd';
import { ChangeEvent, FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setUsername } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsInterlocutorUsername: FC = () => {
  const { username } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  return (
    <Wrapper title='Имя:'>
      <Input defaultValue={username} onChange={handleChange} className='w-40' />
    </Wrapper>
  );
};

export default SettingsInterlocutorUsername;
