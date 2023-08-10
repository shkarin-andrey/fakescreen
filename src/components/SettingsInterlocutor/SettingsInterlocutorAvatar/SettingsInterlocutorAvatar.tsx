import { Divider } from 'antd';
import { FC } from 'react';

import { listColorsBgAvatar } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setBgAvatarColor } from '../../../redux/state/configSlice';
import SettingsInterlocutorDownloadAvatar from '../SettingsInterlocutorDownloadAvatar';

const SettingsInterlocutorAvatar: FC = () => {
  const bgAvatarColor = useAppSelector((state) => state.config.bgAvatarColor);
  const dispatch = useAppDispatch();

  const handleClickBgAvatarColor = (bg: string): void => {
    dispatch(setBgAvatarColor(bg));
  };
  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <div className='flex items-center gap-4'>
        <div className='text-base font-medium'>Аватарка</div>
        <SettingsInterlocutorDownloadAvatar />
      </div>
      <Divider className='my-3' />
      <div className='flex items-center gap-6'>
        {listColorsBgAvatar.map((bg: string) => (
          <div
            key={bg}
            aria-hidden='true'
            onClick={() => handleClickBgAvatarColor(bg)}
            className={`w-11 h-11 rounded-full cursor-pointer outline-offset-2 outline-green-300 ${
              bgAvatarColor === bg ? 'outline outline-4' : ''
            }`}
            style={{ background: bg }}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsInterlocutorAvatar;
