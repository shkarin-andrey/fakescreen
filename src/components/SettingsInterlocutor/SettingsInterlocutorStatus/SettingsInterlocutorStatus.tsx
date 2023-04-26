import { Button, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { FC, useState } from 'react';

import { options } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setStatus } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsInterlocutorStatus: FC = () => {
  const dispatch = useAppDispatch();

  const [time, setTime] = useState('');
  const [format, setFormat] = useState('HH:mm');
  const [selectStatus, setSelectStatus] = useState(options[0]);

  const handleChangeStatus = (_: any, item: any) => {
    setSelectStatus(item);

    if (item.value === 'minutesAgo') {
      setFormat('mm');
    }

    if (item.value === 'hourseAgo') {
      setFormat('HH');
    }

    if (item.value === 'today' || item.value === 'yesterday') {
      setFormat('HH:mm');
    }
  };

  const handleChangeTime = (_: dayjs.Dayjs | null, value: string) => {
    setTime(value);
  };

  const handleSubmit = () => {
    let str = selectStatus.label;

    if (selectStatus.value === 'minutesAgo') {
      str = str.replace('*', time);
    }

    if (selectStatus.value === 'hourseAgo') {
      str = str.replace('*', time);
    }

    if (selectStatus.value === 'today' || selectStatus.value === 'yesterday') {
      str = str.replace('*', time);
    }

    dispatch(setStatus(str));
  };

  return (
    <Wrapper title='Статус в сети:'>
      <Select
        defaultValue='online'
        className='w-44'
        onChange={handleChangeStatus}
        options={options}
      />
      {(selectStatus.value === 'minutesAgo' ||
        selectStatus.value === 'hourseAgo' ||
        selectStatus.value === 'today' ||
        selectStatus.value === 'yesterday') && (
        <TimePicker onChange={handleChangeTime} format={format} />
      )}

      <Button onClick={handleSubmit} type='primary'>
        Изменить
      </Button>
    </Wrapper>
  );
};

export default SettingsInterlocutorStatus;
