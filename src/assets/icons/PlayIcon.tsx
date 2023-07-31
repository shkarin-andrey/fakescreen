import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { Message } from '../../redux/state/chatSlice';

interface IPlayIcon {
  type: Message['type'];
}

const PlayIcon: FC<IPlayIcon> = ({ type }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const fillColorCircleIcon = useMemo(() => {
    if (theme === 'dark') {
      return 'white';
    }

    if (type === 'owner') {
      return 'white';
    }

    return '#5FA2F4';
  }, [type, theme]);

  const fillColorIcon = useMemo(() => {
    if (theme === 'dark') {
      return '#313131';
    }

    if (type === 'owner') {
      return '#5FA2F4';
    }

    return 'white';
  }, [type, theme]);

  return (
    <svg width='36' height='36' viewBox='0 0 36 36' fill='none'>
      <circle cx='18.0001' cy='17.9998' r='17.16' fill={fillColorCircleIcon} />
      <path
        d='M25.2052 17.6484C25.4726 17.8064 25.4726 18.1933 25.2052 18.3512L13.2533 25.4122C12.9812 25.5729 12.6375 25.3768 12.6375 25.0608L12.6376 10.9389C12.6376 10.6229 12.9812 10.4267 13.2533 10.5875L25.2052 17.6484Z'
        fill={fillColorIcon}
      />
    </svg>
  );
};

export default PlayIcon;
