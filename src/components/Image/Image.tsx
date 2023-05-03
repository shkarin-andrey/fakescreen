import { FC, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { IImage } from './Image.interface';

const Image: FC<IImage> = ({ src, onClick, select }) => {
  const isSelect = select === src;

  return (
    <LazyLoadImage
      key={src}
      src={src}
      alt='img'
      className={`img-lazy w-[86px] h-[144px] cursor-pointer outline-offset-2 outline-green-300 ${
        isSelect ? 'outline outline-4' : ''
      }`}
      effect='blur' // opacity | black-and-white
      onClick={() => onClick(src)}
    />
    // <div
    //   aria-hidden='true'
    //   className={`w-[86px] h-[144px] cursor-pointer outline-offset-2 outline-green-300 ${
    //     isSelect ? 'outline outline-4' : ''
    //   }`}
    //   onClick={() => onClick(src)}
    // >
    //   <img src={src} alt='img' className='w-full h-full object-cover' />
    // </div>
  );
};

export default memo(Image);
