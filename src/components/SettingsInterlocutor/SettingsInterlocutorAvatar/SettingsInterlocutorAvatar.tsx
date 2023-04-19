import { FC } from 'react';

import { listColorsBgAvatar } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setBgAvatarColor } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsInterlocutorAvatar: FC = () => {
  const { bgAvatarColor } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const handleClickBgAvatarColor = (bg: string): void => {
    dispatch(setBgAvatarColor(bg));
  };
  return (
    <Wrapper title='Фон аватарки:'>
      <div className='flex items-center gap-2'>
        {listColorsBgAvatar.map((bg: string) => (
          <div
            key={bg}
            aria-hidden='true'
            onClick={() => handleClickBgAvatarColor(bg)}
            className={`w-10 h-10 rounded-full cursor-pointer outline-offset-2 outline-green-300 ${
              bgAvatarColor === bg ? 'outline outline-4' : ''
            }`}
            style={{ background: bg }}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default SettingsInterlocutorAvatar;
