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
    <svg width='4' height='10' viewBox='0 0 4 10' fill='none'>
      <path
        d='M0 8H4V7.09771H1.10493V5.38046H3.84154V4.52807H1.10493V2.90229H4V2H0V8Z'
        fill={color}
      />
    </svg>
  );
};

export default EthernetEIcon;
