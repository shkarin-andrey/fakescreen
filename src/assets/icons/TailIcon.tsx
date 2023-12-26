import { FC, useMemo } from 'react';

import { gallary } from '../../components/SettingsInterlocutor/SettingsInterlocutorIGallary/SettingsInterlocutorIGallary.config';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Message } from '../../redux/state/chatSlice';

interface ITailIcon {
  type: Message['type'];
}

const TailIcon: FC<ITailIcon> = ({ type }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const bgImage = useAppSelector((state) => state.config.bgImage);

  const color = useMemo(() => {
    if (bgImage === gallary[1]?.preview && type !== 'owner' && theme !== 'dark') {
      return '#F1F1F4';
    }

    if (theme === 'dark' && type === 'owner') {
      return '#313131';
    }

    if (theme === 'dark' && type !== 'owner') {
      return '#1A1A1A';
    }

    if (type === 'owner') {
      return '#5DA0F5';
    }

    return 'white';
  }, [theme, type, bgImage, gallary]);

  return (
    <svg width='11' height='17' viewBox='0 0 11 17' fill='none'>
      <path
        d='M9.91863 15.3625C8.95893 15.0186 6.72 11.4942 6.72 8.48562L6.71967 5.9068L6.64336 1.72046L1.12164 11.924C1.92153 16.2221 11.1182 15.7923 9.91863 15.3625Z'
        fill={color}
        stroke={color}
        strokeWidth='0.859606'
      />
    </svg>
  );
};

export default TailIcon;
