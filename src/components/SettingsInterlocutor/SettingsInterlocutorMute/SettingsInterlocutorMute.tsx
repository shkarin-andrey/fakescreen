import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setMute } from '../../../redux/state/configSlice';

const SettingsInterlocutorMute: FC = () => {
  const dispatch = useAppDispatch();
  const mute = useAppSelector((state) => state.config.mute);

  const handleChangeMute = (e: CheckboxChangeEvent) => {
    dispatch(setMute(e.target.checked));
  };

  return (
    <div className='flex items-center gap-2'>
      <Checkbox checked={mute} onChange={handleChangeMute} />
      <div className='text-sm'>Без звука</div>
    </div>
  );
};

export default SettingsInterlocutorMute;
