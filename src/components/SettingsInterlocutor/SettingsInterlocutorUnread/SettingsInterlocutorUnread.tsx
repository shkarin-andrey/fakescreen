import { Checkbox, InputNumber } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setIsUnread, setUnread } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsInterlocutorUnread: FC = () => {
  const dispatch = useAppDispatch();
  const { isUnread, unread } = useAppSelector((state) => state.config);

  const handleChangeIsUnread = (e: CheckboxChangeEvent): void => {
    dispatch(setIsUnread(e.target.checked));
  };

  const handleChangeUnread = (value: any): void => {
    dispatch(setUnread(value));
  };

  return (
    <Wrapper title='Непрочитанные:'>
      <div className='flex items-center gap-2'>
        <Checkbox onChange={handleChangeIsUnread} checked={isUnread} />
        <InputNumber onChange={handleChangeUnread} value={unread} min={1} max={99} />
      </div>
    </Wrapper>
  );
};

export default SettingsInterlocutorUnread;
