import { Select } from 'antd';
import { FC } from 'react';

import { options } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setStatus } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsInterlocutorStatus: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeStatus = (_: string, { label }: any): void => {
    dispatch(setStatus(label));
  };

  return (
    <Wrapper title='Статус в сети:'>
      <Select
        defaultValue='online'
        className='w-44'
        onChange={handleChangeStatus}
        options={options}
      />
    </Wrapper>
  );
};

export default SettingsInterlocutorStatus;
