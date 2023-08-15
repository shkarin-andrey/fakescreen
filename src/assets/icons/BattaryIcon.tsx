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
    <div className='relative mt-[4px]'>
      {isCharge && (
        <div className='absolute left-1/2 top-1/2 -translate-y-[52%] -translate-x-[62%]'>
          <ChargeIcon />
        </div>
      )}
      <svg width='21' height='11' viewBox='0 0 22 11' fill='none'>
        <path
          opacity='0.35'
          d='M2.35595 0.441741H17.0807C18.1379 0.441741 18.9949 1.29876 18.9949 2.35595V7.65684C18.9949 8.71403 18.1379 9.57105 17.0807 9.57105H2.35596C1.29876 9.57105 0.441741 8.71403 0.441741 7.65684V2.35596C0.441741 1.29876 1.29876 0.441741 2.35595 0.441741Z'
          stroke={theme === 'dark' ? 'white' : 'black'}
          strokeWidth='0.883483'
        />
        <path
          opacity='0.4'
          d='M20.3203 3.23926V6.77319C21.0313 6.47388 21.4936 5.77762 21.4936 5.00622C21.4936 4.23482 21.0313 3.53856 20.3203 3.23926'
          fill={theme === 'dark' ? 'white' : 'black'}
        />
        <rect
          x='2'
          y='2'
          width={width}
          height='6.3'
          rx='0.858538'
          fill={getColorfromPercent(size, isEconom, isCharge, theme)}
        />
      </svg>
    </div>
  );
};

export default BattaryIcon;
