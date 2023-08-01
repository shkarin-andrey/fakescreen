import { FC, useEffect, useMemo, useState } from 'react';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { IAudioLine } from './AudioLine.interface';

const AudioLine: FC<IAudioLine> = ({ count = 1, type }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const [arr, setArr] = useState<number[]>([]);
  const min = 1.56;
  const max = 12.09;
  const y = 12.7407;

  const widthLineBlock = useMemo(
    () => (arr && arr.length > 0 ? 1 + arr.length * 3.1 + min : 47),
    [arr, min],
  );

  const bgColorLine = useMemo(() => {
    if (type === 'owner' || theme === 'dark') {
      return 'white';
    }

    return '#5FA2F4';
  }, [type, theme]);

  useEffect(() => {
    const newArr: number[] = [];

    for (let index = 0; index < count; index++) {
      const lineHeight = Math.floor(Math.random() * max) + min;

      newArr.push(lineHeight);
    }

    setArr(newArr);
  }, [count]);

  return (
    <svg
      height='13'
      viewBox={`0 0 ${widthLineBlock} 13`}
      fill='none'
      className='translate-y-[1px]'
    >
      {arr.map((item, index) => (
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
