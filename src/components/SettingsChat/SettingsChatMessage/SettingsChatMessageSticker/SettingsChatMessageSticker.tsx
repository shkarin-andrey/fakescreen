import 'swiper/css';
import 'swiper/css/pagination';

import { FC, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Pagination } from 'swiper/modules';
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
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
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
