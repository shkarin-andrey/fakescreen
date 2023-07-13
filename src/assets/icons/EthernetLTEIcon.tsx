import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

const EthernetLTEIcon: FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const color = useMemo(() => {
    if (theme === 'dark') {
      return 'white';
    }

    return 'black';
  }, [theme]);

  return (
    <svg width='13' height='7' viewBox='0 0 13 7' fill='none'>
      <path
        d='M0.0703125 6.80727H3.77996V5.83957H1.16681V0.18457H0.618562H0.0703125V6.80727Z'
        fill={color}
      />
      <path
        d='M5.21837 6.80727H6.31488V1.15957H7.795V0.18457H5.76797H3.74094V1.15957H5.21837V6.80727Z'
        fill={color}
      />
      <path
        d='M9.30152 6.81457H11.1232H12.9449V5.84687H10.398V4.00511H12.9449V3.09092H10.398V1.15957H12.9449V0.863422V0.191868H9.30152V6.81457Z'
        fill={color}
      />
    </svg>
  );
};

export default EthernetLTEIcon;
