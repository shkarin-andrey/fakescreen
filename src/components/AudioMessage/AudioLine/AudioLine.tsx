import { FC, useMemo } from 'react';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { IAudioLine } from './AudioLine.interface';

const AudioLine: FC<IAudioLine> = ({ type, isListened, dataList, width }) => {
  const y = 12.7407;

  const theme = useAppSelector((state) => state.theme.theme);

  const bgColorLine = useMemo(() => {
    if (isListened) {
      if (theme === 'dark' && type === 'owner') {
        return '#8C8C8C';
      }

      if (theme === 'dark' && type !== 'owner') {
        return '#878787';
      }

      if (type === 'owner') {
        return '#C0DDFC';
      }

      return '#BEBEBE';
    }

    if (type === 'owner' || theme === 'dark') {
      return 'white';
    }

    return '#5FA2F4';
  }, [type, theme, isListened]);

  return (
    <svg
      height='13'
      viewBox={`0 0 ${width} 13`}
      fill='none'
      className='translate-y-[1px]'
    >
      {dataList?.map((item, index) => (
        <rect
          key={`${item}_${index}`}
          x={1 + index * 3.1}
          y={y - item}
          width='1.56'
          height={item}
          rx='0.78'
          fill={bgColorLine}
        />
      ))}
    </svg>
  );
};

export default AudioLine;
