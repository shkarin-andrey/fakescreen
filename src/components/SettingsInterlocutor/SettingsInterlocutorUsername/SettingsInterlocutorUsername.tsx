import { Divider, Input } from 'antd';
import { ChangeEvent, FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setUsername } from '../../../redux/state/configSlice';
import SettingsInterlocutorMute from '../SettingsInterlocutorMute';
import SettingsInterlocutorSpum from '../SettingsInterlocutorSpum';
import SettingsInterlocutorUnread from '../SettingsInterlocutorUnread';

const SettingsInterlocutorUsername: FC = () => {
  const username = useAppSelector((state) => state.config.username);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <div className='flex items-center gap-4'>
        <div className='text-base font-medium'>Имя собеседника</div>
        <Input defaultValue={username} onChange={handleChange} className='w-40' />
      </div>
      <Divider className='my-3' />
      <div className='flex flex-col gap-3'>
        <SettingsInterlocutorSpum />
        <SettingsInterlocutorMute />
        <SettingsInterlocutorUnread />
      </div>
    </div>
  );
};

export default SettingsInterlocutorUsername;
