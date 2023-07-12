import { FC } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

interface INoViewedMessageIcon {
  isBackground?: boolean;
}

const NoViewedMessageIcon: FC<INoViewedMessageIcon> = ({ isBackground = false }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <svg width='11' height='8' viewBox='0 0 11 8' fill='none'>
      <path
        d='M2.25 4.44004L4.37411 6.59701L9.39 1.29004'
        stroke={isBackground && theme === 'light' ? '#8C8E93' : 'white'}
        strokeWidth='0.78'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default NoViewedMessageIcon;
