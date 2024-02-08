import { FC, useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setImages } from '../../redux/state/configSlice';
import { listImages } from './SettingsChat.config';
import SettingsChatAudioMessage from './SettingsChatAudioMessage';
import SettingsChatImageMessage from './SettingsChatImageMessage';
import SettingsChatMessage from './SettingsChatMessage';
import SettingsChatTime from './SettingsChatTime';

const SettingsChat: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setImages(listImages()));
  }, []);

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
