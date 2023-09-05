import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

interface IDividerIcon {
  width: number;
}

const DividerIcon: FC<IDividerIcon> = ({ width }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const color = useMemo(() => {
    if (theme === 'dark') {
      return 'rgba(232, 232, 232, 0.3)';
    }

    return 'rgba(46, 46, 48, 0.3)';
  }, [theme]);

  return (
    <svg
      width={width}
      height='1'
      className='absolute backdrop-blur-[100px]'
      viewBox={`0 0 ${width} 1`}
      fill='none'
    >
      <line x1='0' x2={width} stroke={color} strokeWidth='1' />
    </svg>
  );
};

export default DividerIcon;
