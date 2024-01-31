import { FC, useMemo } from 'react';

import { IEditCardImage, SelectType } from './EditCardImage.interface';

const EditCardImage: FC<IEditCardImage> = ({ onSelect, type }) => {
  const classNameCard = useMemo(() => {
    if (type === 'vertical') {
      return 'w-[25px] h-[45px]';
    }

    if (type === 'square') {
      return 'w-[25px] h-[25px]';
    }
    if (type === 'horizon') {
      return 'w-[45px] h-[25px]';
    }
  }, [type]);

  return (
    <div
      aria-hidden={true}
      onClick={() => onSelect(type)}
      className='group rounded-md flex flex-col items-center gap-1 pt-2 px-4 pb-1 bg-[#171717] cursor-pointer hover:bg-[#5A5A5A] transition-colors duration-200'
    >
      <div
        className={`rounded-[3px] border border-white bg-[#4A4A4A] group-hover:bg-white transition-colors duration-200 ${classNameCard}`}
      />
      <div className='text-xs text-white'>{SelectType[type]}</div>
    </div>
  );
};

export default EditCardImage;
