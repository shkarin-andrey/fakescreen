import { Checkbox, InputNumber } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setIsUnread, setUnread } from '../../../redux/state/configSlice';

const SettingsInterlocutorUnread: FC = () => {
  const dispatch = useAppDispatch();
  const isUnread = useAppSelector((state) => state.config.isUnread);
  const unread = useAppSelector((state) => state.config.unread);

  const handleChangeIsUnread = (e: CheckboxChangeEvent): void => {
    dispatch(setIsUnread(e.target.checked));
  };

  const handleChangeUnread = (value: number | null): void => {
    dispatch(setUnread(value));
  };

  return (
    <div className='flex items-center gap-2'>
      <Checkbox onChange={handleChangeIsUnread} checked={isUnread}>
        Непрочитанные собщения
      </Checkbox>
      <InputNumber
        onChange={handleChangeUnread}
        value={unread}
        min={1}
        max={9999}
        size='small'
      />
    </div>
  );
};

export default SettingsInterlocutorUnread;
