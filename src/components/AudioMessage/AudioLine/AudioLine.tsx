import { FC, useEffect, useState } from 'react';

import { IAudioLine } from './AudioLine.interface';

const AudioLine: FC<IAudioLine> = ({ count = 1, className }) => {
  const [arr, setArr] = useState<number[]>([]);
  const min = 1.56;
  const max = 12.09;

  useEffect(() => {
    const newArr: number[] = [];

    for (let index = 0; index < count; index++) {
      const lineHeight = Math.floor(Math.random() * max) + min;

      newArr.push(lineHeight);
    }

    setArr(newArr);
  }, [count]);

  return (
    <div className='flex items-end gap-[1.56px]'>
      {arr.map((item, index) => (
        <div
          key={`${item}_${index}`}
          className={`rounded-[0.78px] w-[1.56px] dark:bg-white ${className}`}
          style={{
            height: item,
          }}
        ></div>
      ))}
    </div>
  );
};

export default AudioLine;
