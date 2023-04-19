import { FC } from 'react';

import stickers from './SettingsChatMessageSticker.config';
import { ISettingsChatMessageSticker } from './SettingsChatMessageSticker.interface';

const SettingsChatMessageSticker: FC<ISettingsChatMessageSticker> = ({
  select,
  onSelect,
}) => {
  return (
    <div className='flex items-center flex-wrap gap-5'>
      {stickers.map((sticker: string) => (
        <div
          key={sticker}
          className={`w-20 cursor-pointer outline-offset-2 outline-green-300 ${
            select === sticker ? 'outline outline-4' : ''
          }`}
          aria-hidden={true}
          onClick={() => onSelect(sticker)}
        >
          <img className='w-full' src={sticker} alt='sticker' />
        </div>
      ))}
    </div>
  );
};

export default SettingsChatMessageSticker;
