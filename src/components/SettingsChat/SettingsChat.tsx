import { FC } from 'react';

import SettingsChatMessage from './SettingsChatMessage';
import SettingsChatTime from './SettingsChatTime';

const SettingsChat: FC = () => {
  return (
    <div className='flex flex-col gap-10'>
      <SettingsChatTime />
      <SettingsChatMessage />
    </div>
  );
};

export default SettingsChat;
