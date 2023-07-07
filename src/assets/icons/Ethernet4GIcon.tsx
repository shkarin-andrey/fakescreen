import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

const Ethernet4GIcon: FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const color = useMemo(() => {
    if (theme === 'dark') {
      return 'white';
    }

    return 'black';
  }, [theme]);

  return (
    <svg width='12' height='10' viewBox='0 0 12 10' fill='none'>
      <path
        d='M3.79604 7.85743H4.77426V6.7604H5.54257V5.91683H4.77426V2.14257H3.32871C2.55248 3.32277 1.74059 4.63762 1 5.92475V6.7604H3.79604V7.85743ZM1.9505 5.94059V5.88119C2.50495 4.91089 3.16634 3.85347 3.75248 2.95842H3.81188V5.94059H1.9505Z'
        fill={color}
      />
      <path
        d='M8.67176 8C10.1965 8 11.1708 7.05347 11.1708 5.57624V4.86337H8.79849V5.64356H10.1688L10.1648 5.76238C10.1529 6.57426 9.55889 7.11683 8.6876 7.11683C7.66978 7.11683 7.0282 6.30495 7.0282 4.99406V4.98614C7.0282 3.69505 7.6579 2.88317 8.65592 2.88317C9.38859 2.88317 9.91137 3.24752 10.0975 3.87327L10.1094 3.91287H11.1232L11.1193 3.87327C10.9252 2.75644 9.97473 2 8.65592 2C7.0282 2 5.98661 3.16832 5.98661 4.99406V5.00198C5.98661 6.84752 7.01632 8 8.67176 8Z'
        fill={color}
      />
    </svg>
  );
};

export default Ethernet4GIcon;
