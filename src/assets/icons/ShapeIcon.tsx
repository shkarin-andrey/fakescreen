import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

const ShapeIcon: FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const color = useMemo(() => {
    if (theme === 'dark') {
      return '#FFFFFF';
    }

    return '#007AFF';
  }, [theme]);

  return (
    <svg width='10' height='17' viewBox='0 0 10 17' fill='none' className='min-w-[10px]'>
      <path
        d='M3.06507 8.4445L9.21916 2.26183C9.67682 1.80204 9.66992 1.06338 9.20376 0.611983C8.7376 0.160584 7.98869 0.167383 7.53103 0.627169L0.563395 7.62717C0.111681 8.08098 0.111681 8.80802 0.563395 9.26183L7.53103 16.2618C7.98869 16.7216 8.7376 16.7284 9.20376 16.277C9.66992 15.8256 9.67682 15.087 9.21916 14.6272L3.06507 8.4445Z'
        fill={color}
      />
    </svg>
  );
};

export default ShapeIcon;
