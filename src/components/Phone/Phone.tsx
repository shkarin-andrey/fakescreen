import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import phoneImg from '../../assets/images/phone.svg';
import { useAppSelector } from '../../hooks/useAppSelector';
import PhoneChat from './PhoneChat';
import PhoneFooter from './PhoneFooter';
import PhoneHeader from './PhoneHeader';

const Phone: FC = () => {
  const bgImage = useAppSelector((state) => state.config.bgImage);

  return (
    <div className='flex flex-col gap-5 max-w-[376px] min-w-[376px]'>
      <div
        className='h-[746px] relative py-6 px-[27px]'
        style={{
          borderImageSource: `url(${phoneImg})`,
          borderImageSlice: '120 100 140 fill',
          borderImageRepeat: 'repeat stretch',
          borderImageWidth: '115px 101px 133px',
        }}
      >
        <div
          id='phone'
          className='w-full h-full flex flex-col relative flex-1 rounded-[30px] overflow-hidden'
          style={{
            backgroundImage: `url('${bgImage}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <PhoneHeader />
          <DndProvider backend={HTML5Backend}>
            <PhoneChat />
          </DndProvider>
          <PhoneFooter />
        </div>
      </div>
    </div>
  );
};

export default Phone;
