import { FC } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

interface IViewedMessageIcon {
  isBackground?: boolean;
}

const ViewedMessageIcon: FC<IViewedMessageIcon> = ({ isBackground = false }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <svg width='12' height='8' viewBox='0 0 12 8' fill='none'>
      <path
        d='M1.80005 4.42051L3.92416 6.57748L8.94005 1.27051M11.46 1.27051L6.52729 6.55561L6.42005 6.67051'
        stroke={isBackground && theme === 'light' ? '#8C8E93' : 'white'}
        strokeWidth='0.78'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ViewedMessageIcon;
