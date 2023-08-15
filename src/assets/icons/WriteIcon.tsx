import { FC } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

const WriteIcon: FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <svg width='13' height='4' viewBox='0 0 13 4' fill='none'>
      <circle cx='1' cy='2' r='1' fill={theme === 'dark' ? 'white' : '#3178F4'} />
      <circle cx='5.5' cy='2' r='1.5' fill={theme === 'dark' ? 'white' : '#3178F4'} />
      <circle cx='11' cy='2' r='2' fill={theme === 'dark' ? 'white' : '#3178F4'} />
    </svg>
  );
};

export default WriteIcon;
