import { FC } from 'react';

import SettingsInterlocutorAvatar from './SettingsInterlocutorAvatar';
import SettingsInterlocutorDownloadAvatar from './SettingsInterlocutorDownloadAvatar';
import SettingsInterlocutorIGallary from './SettingsInterlocutorIGallary';
import SettingsInterlocutorMute from './SettingsInterlocutorMute';
import SettingsInterlocutorSpum from './SettingsInterlocutorSpum';
import SettingsInterlocutorStatus from './SettingsInterlocutorStatus';
import SettingsInterlocutorUnread from './SettingsInterlocutorUnread';
import SettingsInterlocutorUsername from './SettingsInterlocutorUsername';

const SettingsInterlocutor: FC = () => {
  return (
    <div className='flex flex-col gap-10'>
      <SettingsInterlocutorUsername />
      <SettingsInterlocutorSpum />
      <SettingsInterlocutorMute />
      <SettingsInterlocutorUnread />
      <SettingsInterlocutorAvatar />
      <SettingsInterlocutorDownloadAvatar />
      <SettingsInterlocutorStatus />
      <SettingsInterlocutorIGallary />
    </div>
  );
};

export default SettingsInterlocutor;
