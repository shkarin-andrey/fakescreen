import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { FC, memo, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setTime } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsPhoneTime: FC = () => {
  const format = 'HH:mm';
  dayjs.extend(customParseFormat);

  const dispatch = useAppDispatch();
  const time = useAppSelector((state) => state.config.time);

  const handleChangeTime = useCallback((_: dayjs.Dayjs | null, value: string) => {
    dispatch(setTime(value));
  }, []);

  return (
    <Wrapper title='Время на устройстве:'>
      <TimePicker
        defaultValue={dayjs(time, format)}
        onChange={handleChangeTime}
        format={format}
        clearIcon={null}
      />
    </Wrapper>
  );
};

export default memo(SettingsPhoneTime);
