import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setSpum } from '../../../redux/state/configSlice';

const SettingsInterlocutorSpum: FC = () => {
  const dispatch = useAppDispatch();

  const spum = useAppSelector((state) => state.config.spum);

  const handleChangeSpum = (e: CheckboxChangeEvent) => {
    dispatch(setSpum(e.target.checked));
  };

  return (
    <div className='flex items-center gap-2'>
      <Checkbox checked={spum} onChange={handleChangeSpum} />
      <div className='text-sm'>Спам</div>
    </div>
  );
};

export default SettingsInterlocutorSpum;
