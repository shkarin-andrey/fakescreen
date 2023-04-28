import { FC } from 'react';

import SettingsInterlocutorStatus from '../SettingsInterlocutor/SettingsInterlocutorStatus';
import SettingsChatMessage from './SettingsChatMessage';
import SettingsChatTime from './SettingsChatTime';

const SettingsChat: FC = () => {
  return (
    <div className='flex flex-col gap-5'>
      <SettingsInterlocutorStatus />
      <SettingsChatTime />
      <SettingsChatMessage />
    </div>
  );
};

export default SettingsChat;
