import { FC } from 'react';

import SettingsInterlocutorAvatar from './SettingsInterlocutorAvatar';
import SettingsInterlocutorIGallary from './SettingsInterlocutorIGallary';
import SettingsInterlocutorStatus from './SettingsInterlocutorStatus';
import SettingsInterlocutorUsername from './SettingsInterlocutorUsername';

const SettingsInterlocutor: FC = () => {
  return (
    <div className='flex flex-col gap-3'>
      <SettingsInterlocutorUsername />
      <SettingsInterlocutorStatus />
      <SettingsInterlocutorAvatar />
      <SettingsInterlocutorIGallary />
    </div>
  );
};

export default SettingsInterlocutor;
