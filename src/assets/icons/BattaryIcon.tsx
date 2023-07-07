import { FC, useMemo } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { getColorfromPercent } from '../../utils/getColorfromPercent';
import ChargeIcon from './ChargeIcon';

interface IBattaryIcon {
  size: number;
  isEconom: boolean;
  isCharge: boolean;
}

const BattaryIcon: FC<IBattaryIcon> = ({ size, isEconom, isCharge }) => {
  const costomWidth = 15.5;
  const theme = useAppSelector((state) => state.theme.theme);

  const width = useMemo(() => {
    return (costomWidth * size) / 100;
  }, [size]);

  return (
    <div className='relative mt-[2px]'>
      {isCharge && (
        <div className='absolute left-1/2 top-1/2 -translate-y-[45%] -translate-x-[55%]'>
          <ChargeIcon />
        </div>
      )}
      <svg width='22' height='10' viewBox='0 0 22 10' fill='none'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.61509 0.453613C1.4297 0.453613 0.46875 1.41456 0.46875 2.59996V7.32192C0.46875 8.50731 1.4297 9.46826 2.61509 9.46826H16.3248H17.2102C18.3956 9.46826 19.3566 8.50731 19.3566 7.32192V2.59996C19.3566 1.41456 18.3956 0.453613 17.2102 0.453613H2.61509ZM3.04428 1.31226C2.09597 1.31226 1.32721 2.08102 1.32721 3.02933V6.89275C1.32721 7.84107 2.09597 8.60983 3.04428 8.60983H15.4662H16.7809C17.7292 8.60983 18.498 7.84107 18.498 6.89275V3.02933C18.498 2.08102 17.7292 1.31226 16.7809 1.31226H3.04428Z'
          fill='#ABABAB'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M20.2148 6.78446C20.9554 6.59384 21.5027 5.92156 21.5027 5.12148C21.5027 4.32139 20.9554 3.64911 20.2148 3.4585V6.78446Z'
          fill='#ABABAB'
        />
        <rect
          x='2.18604'
          y='2.1709'
          width={width}
          height='5.5805'
          rx='0.858538'
          fill={getColorfromPercent(size, isEconom, isCharge, theme)}
        />
      </svg>
    </div>
  );
};

export default BattaryIcon;
