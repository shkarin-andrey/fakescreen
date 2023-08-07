import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

const EthernetEIcon: FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const color = useMemo(() => {
    if (theme === 'dark') {
      return 'white';
    }

    return 'black';
  }, [theme]);

  return (
    <svg width='6' height='8' viewBox='0 0 6 8' fill='none'>
      <g clipPath='url(#clip0_1950_32581)'>
        <path
          d='M0.616211 7.50762H5.03378V6.48127H1.83648V4.52789H4.85878V3.55829H1.83648V1.70897H5.03378V0.682617H0.616211V7.50762Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_1950_32581'>
          <rect width='6' height='8' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EthernetEIcon;
