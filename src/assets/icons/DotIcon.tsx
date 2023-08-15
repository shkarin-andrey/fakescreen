import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { Message } from '../../redux/state/chatSlice';

interface IDotIcon {
  type: Message['type'];
}

const DotIcon: FC<IDotIcon> = ({ type }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const fillCircle = useMemo(() => {
    if (type === 'owner' || theme === 'dark') {
      return 'white';
    }

    return '#5FA2F4';
  }, [type, theme]);

  return (
    <svg width='4' height='5' viewBox='0 0 4 5' fill='none'>
      <circle cx='1.87982' cy='2.53998' r='1.56' fill={fillCircle} />
    </svg>
  );
};

export default DotIcon;
