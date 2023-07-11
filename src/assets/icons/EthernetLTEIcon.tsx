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
    <svg width='12' height='10' viewBox='0 0 12 10' fill='none'>
      <path d='M0 8H3.45888V7.09771H1.02238V2H0V8Z' fill={color} />
      <path
        d='M4.85306 8H5.87544V2.90229H7.2555V2H3.4755V2.90229H4.85306V8Z'
        fill={color}
      />
      <path
        d='M8.04818 8H11.2589V7.09771H9.07056V5.38046H11.1869V4.52807H9.07056V2.90229H11.2589V2H8.04818V8Z'
        fill={color}
      />
    </svg>
  );
};

export default EthernetLTEIcon;
