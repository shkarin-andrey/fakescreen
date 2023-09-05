import { Button, Divider, InputNumber, Select } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { options } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setStatus } from '../../../redux/state/configSlice';

const SettingsInterlocutorStatus: FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.config.status);
  const [time, setTime] = useState<string | number>('');
  const [selectStatus, setSelectStatus] = useState(options[1]);

  const defaultValue = options.find((item) => item.label === status.id)?.value;

  const handleChangeStatus = (_: string, item: any) => {
    setSelectStatus(item);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | number | null) => {
    if (!e) return;

    if (typeof e !== 'number') {
      setTime(e?.target.value);
    } else {
      setTime(e);
    }
  };

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <div className='flex items-center gap-4'>
        <div className='text-base font-medium'>Статус в сети</div>
        <Button onClick={handleSubmit} type='primary' size='small'>
          Изменить
        </Button>
      </div>
      <Divider className='my-3' />
      <div className='flex items-center gap-4'>
        <Select
          defaultValue={defaultValue}
          className='w-80'
          onChange={handleChangeStatus}
          size='small'
        >
          {options.map((item) => (
            <Select.Option key={item.value} value={item.value} label={item.label}>
              {item.value === 'minutesAgo' ? (
                <span>
                  <FormattedMessage id={item.label} />{' '}
                  <FormattedMessage id={'minute_age'} />
                </span>
              ) : item.value === 'hourseAgo' ? (
                <span>
                  <FormattedMessage id={item.label} />{' '}
                  <FormattedMessage id={'hour_age'} />
                </span>
              ) : (
                <FormattedMessage id={item.label} />
              )}
            </Select.Option>
          ))}
        </Select>
        {(selectStatus.value === 'today' || selectStatus.value === 'yesterday') && (
          <MaskedInput
            className='w-[88px]'
            size='small'
            onChange={handleChange}
            defaultValue='14:20'
            mask={'0[0]:00'}
          />
        )}
        {selectStatus.value === 'hourseAgo' && (
          <InputNumber
            min={1}
            max={23}
            onChange={handleChange}
            size='small'
            defaultValue={1}
          />
        )}
        {selectStatus.value === 'minutesAgo' && (
          <InputNumber
            min={1}
            max={59}
            onChange={handleChange}
            size='small'
            defaultValue={1}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsInterlocutorStatus;
