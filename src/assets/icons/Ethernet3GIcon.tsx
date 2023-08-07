import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

const Ethernet3GIcon: FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const color = useMemo(() => {
    if (theme === 'dark') {
      return 'white';
    }

    return 'black';
  }, [theme]);

  return (
    <svg width='13' height='8' viewBox='0 0 13 8' fill='none'>
      <path
        d='M2.78506 7.38087C4.22664 7.38087 5.21322 6.58349 5.21322 5.43923V5.43022C5.21322 4.52923 4.57803 3.96161 3.62298 3.87151V3.84899C4.40233 3.68681 4.98347 3.15072 4.98347 2.34433V2.33532C4.98347 1.3172 4.11402 0.618937 2.77605 0.618937C1.4651 0.618937 0.57763 1.35775 0.478521 2.48399L0.474016 2.53354H1.5552L1.55971 2.48849C1.61827 1.90735 2.09129 1.54245 2.77605 1.54245C3.46981 1.54245 3.87075 1.89384 3.87075 2.48849V2.4975C3.87075 3.06513 3.39322 3.47057 2.67694 3.47057H1.93362V4.33552H2.69946C3.53288 4.33552 4.03743 4.71394 4.03743 5.39869V5.4077C4.03743 6.01136 3.53738 6.43032 2.78506 6.43032C2.02372 6.43032 1.51466 6.03839 1.45159 5.48879L1.44709 5.43923H0.338867L0.343372 5.49329C0.428966 6.60602 1.36149 7.38087 2.78506 7.38087Z'
        fill={color}
      />
      <path
        d='M8.81773 7.4124C10.5521 7.4124 11.6604 6.33572 11.6604 4.65537V3.84448H8.96188V4.73196H10.5206L10.5161 4.86711C10.5026 5.79062 9.82683 6.4078 8.83575 6.4078C7.67797 6.4078 6.94817 5.48428 6.94817 3.99314V3.98414C6.94817 2.51552 7.66446 1.59201 8.79971 1.59201C9.63312 1.59201 10.2278 2.00646 10.4395 2.71824L10.453 2.76329H11.6063L11.6018 2.71824C11.381 1.44785 10.2999 0.587402 8.79971 0.587402C6.94817 0.587402 5.76337 1.91636 5.76337 3.99314V4.00215C5.76337 6.10146 6.93466 7.4124 8.81773 7.4124Z'
        fill={color}
      />
    </svg>
  );
};

export default Ethernet3GIcon;
