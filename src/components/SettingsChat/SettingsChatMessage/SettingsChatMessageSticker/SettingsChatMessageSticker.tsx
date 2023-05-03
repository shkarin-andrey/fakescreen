import { FC, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import stickers from './SettingsChatMessageSticker.config';
import { ISettingsChatMessageSticker } from './SettingsChatMessageSticker.interface';

const SettingsChatMessageSticker: FC<ISettingsChatMessageSticker> = ({
  select,
  onSelect,
}) => {
  return (
    <div className='flex items-center flex-wrap gap-5'>
      {stickers.map((sticker: string) => (
        <LazyLoadImage
          key={sticker}
          src={sticker}
          alt={`sticker`}
          className={`img-lazy w-20 cursor-pointer outline-offset-2 outline-green-300 ${
            select === sticker ? 'outline outline-4' : ''
          }`}
          effect='blur' // opacity | black-and-white
          onClick={() => onSelect(sticker)}
        />
      ))}
    </div>
  );
};

export default memo(SettingsChatMessageSticker);
