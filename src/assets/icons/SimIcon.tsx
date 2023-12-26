import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

interface ISimIcon {
  type: number;
  width?: string;
  height?: string;
  isSettings?: boolean;
}

const SimIcon: FC<ISimIcon> = ({ type, width = '20', height = '14', isSettings }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const color = useMemo(() => {
    if (theme === 'dark' && !isSettings) {
      return 'white';
    }

    return 'black';
  }, [theme]);

  return (
    <svg width={width} height={height} viewBox='0 0 6 4' fill='none' className='mt-[2px]'>
      <path
        d='M0.334897 2.23242H0.669793C0.854751 2.23242 1.00469 2.38234 1.00469 2.56728V3.23699C1.00469 3.42192 0.854751 3.57184 0.669793 3.57184H0.334897C0.149938 3.57184 0 3.42192 0 3.23699V2.56728C0 2.38234 0.149938 2.23242 0.334897 2.23242V2.23242Z'
        fill={type > 0 ? color : 'gray'}
      />
      <path
        d='M1.8974 1.5625H2.23229C2.41725 1.5625 2.56719 1.71242 2.56719 1.89735V3.23677C2.56719 3.42171 2.41725 3.57163 2.23229 3.57163H1.8974C1.71244 3.57163 1.5625 3.42171 1.5625 3.23677V1.89735C1.5625 1.71242 1.71244 1.5625 1.8974 1.5625Z'
        fill={type > 1 ? color : 'gray'}
      />
      <path
        d='M3.4599 0.78125H3.79479C3.97975 0.78125 4.12969 0.931169 4.12969 1.1161V3.23685C4.12969 3.42178 3.97975 3.5717 3.79479 3.5717H3.4599C3.27494 3.5717 3.125 3.42178 3.125 3.23685V1.1161C3.125 0.931169 3.27494 0.78125 3.4599 0.78125Z'
        fill={type > 2 ? color : 'gray'}
      />
      <path
        d='M5.0224 0H5.35729C5.54225 0 5.69219 0.149919 5.69219 0.334854V3.23693C5.69219 3.42186 5.54225 3.57178 5.35729 3.57178H5.0224C4.83744 3.57178 4.6875 3.42186 4.6875 3.23693V0.334854C4.6875 0.149919 4.83744 0 5.0224 0V0Z'
        fill={type > 3 ? color : 'gray'}
      />
    </svg>
  );
};

export default SimIcon;
