import { FC } from 'react';

import SettingsChatAudioMessage from './SettingsChatAudioMessage';
import SettingsChatImageMessage from './SettingsChatImageMessage';
import SettingsChatMessage from './SettingsChatMessage';
import SettingsChatTime from './SettingsChatTime';

const SettingsChat: FC = () => {
  return (
    <div className='flex flex-col gap-3'>
      <SettingsChatTime />
      <SettingsChatImageMessage />
      <SettingsChatAudioMessage />
      <SettingsChatMessage />
    </div>
  );
};

export default SettingsChat;
