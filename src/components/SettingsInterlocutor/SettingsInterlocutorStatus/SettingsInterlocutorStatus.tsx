import { Button, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { options } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setStatus } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsInterlocutorStatus: FC = () => {
  const dispatch = useAppDispatch();

  const [time, setTime] = useState<string | number>('');
  const [format, setFormat] = useState('h:mm');
  const [selectStatus, setSelectStatus] = useState(options[1]);

  const handleChangeStatus = (value: string, item: any) => {
    setSelectStatus(item);

    if (value === 'minutesAgo') {
      setFormat('m');
    }

    if (value === 'hourseAgo') {
      setFormat('h');
    }

    if (value === 'today' || value === 'yesterday') {
      setFormat('h:mm');
    }
  };

  const handleChangeTime = (_: dayjs.Dayjs | null, value: string) => {
    if (selectStatus.value === 'minutesAgo') {
      return setTime(dayjs(_).toDate().getMinutes());
    }

    if (selectStatus.value === 'hourseAgo') {
      return setTime(dayjs(_).toDate().getHours());
    }

    return setTime(value);
  };

  const handleSubmit = () => {
    const str = selectStatus.label;

    if (selectStatus.value === 'minutesAgo') {
      dispatch(
        setStatus({
          id: str,
          time: -time,
          unit: 'minute',
        }),
      );
    } else if (selectStatus.value === 'hourseAgo') {
      dispatch(
        setStatus({
          id: str,
          time: -time,
          unit: 'hour',
        }),
      );
    } else if (selectStatus.value === 'today' || selectStatus.value === 'yesterday') {
      dispatch(
        setStatus({
          id: str,
          time: time,
        }),
      );
    } else {
      dispatch(
        setStatus({
          id: str,
        }),
      );
    }
  };

  return (
    <Wrapper title='Статус в сети:'>
      <Select defaultValue='online' className='w-44' onChange={handleChangeStatus}>
        {options.map((item) => (
          <Select.Option key={item.value} value={item.value} label={item.label}>
            {item.value === 'minutesAgo' ? (
              <span>
                <FormattedMessage id={item.label} />{' '}
                <FormattedMessage id={'minute_age'} />
              </span>
            ) : item.value === 'hourseAgo' ? (
              <span>
                <FormattedMessage id={item.label} /> <FormattedMessage id={'hour_age'} />
              </span>
            ) : (
              <FormattedMessage id={item.label} />
            )}
          </Select.Option>
        ))}
      </Select>
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
