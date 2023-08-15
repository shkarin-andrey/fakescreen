import { FC, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Mousewheel, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import stickers from './SettingsChatMessageSticker.config';
import { ISettingsChatMessageSticker } from './SettingsChatMessageSticker.interface';

const SettingsChatMessageSticker: FC<ISettingsChatMessageSticker> = ({
  select,
  onSelect,
}) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={5}
      pagination={{
        clickable: true,
      }}
      mousewheel={true}
      modules={[Pagination, Mousewheel]}
      className='!p-2 !pb-4'
    >
      {stickers.map((sticker: string) => (
        <SwiperSlide key={sticker}>
          <LazyLoadImage
            src={sticker}
            alt={`sticker`}
            className={`img-lazy w-20 cursor-pointer outline-offset-2 outline-green-300 ${
              select === sticker ? 'outline outline-4' : ''
            }`}
            effect='blur' // opacity | black-and-white
            onClick={() => onSelect(sticker)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default memo(SettingsChatMessageSticker);
