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
    <svg width={width} height={height} viewBox='0 0 20 14' fill='none'>
      <rect
        x='16.3501'
        y='1'
        width='3.2'
        height='12'
        rx='1'
        fill={type > 3 ? color : 'gray'}
      />
      <rect
        x='11.0498'
        y='3.3999'
        width='3.2'
        height='9.6'
        rx='1'
        fill={type > 2 ? color : 'gray'}
      />
      <rect
        x='5.75'
        y='6'
        width='3.2'
        height='7'
        rx='1'
        fill={type > 1 ? color : 'gray'}
      />
      <rect
        x='0.450195'
        y='8.3999'
        width='3.2'
        height='4.6'
        rx='1'
        fill={type > 0 ? color : 'gray'}
      />
    </svg>
  );
};

export default SimIcon;
