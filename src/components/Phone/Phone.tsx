import { Button, notification } from 'antd';
import html2canvas from 'html2canvas';
import { FC, useRef } from 'react';

import phoneImg from '../../assets/images/phone.svg';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { resetChat } from '../../redux/state/chatSlice';
import { downloadJPG } from '../../utils/downloadJPG';
import PhoneChat from './PhoneChat';
import PhoneFooter from './PhoneFooter';
import PhoneHeader from './PhoneHeader';

const Phone: FC = () => {
  const ref = useRef(null);

  const dispatch = useAppDispatch();

  const handleResetChat = () => {
    dispatch(resetChat());
  };

  const handleSaveScreenshot = () => {
    if (ref.current) {
      html2canvas(ref.current, {
        scale: 3.5,
        allowTaint: true,
        useCORS: true,
      })
        .then((canvas) => {
          downloadJPG(canvas);
          notification.success({ message: 'Скриншот сделан успешно' });
        })
        .catch((error) => {
          console.error(error);
          notification.error({ message: error.message });
        });
    }
  };

  return (
    <div className='flex flex-col gap-5 max-w-[376px] w-full '>
      <div className='h-[746px] relative py-6 px-[27px]'>
        <img
          src={phoneImg}
          alt='FakeScreen Pro phone'
          className='absolute top-0 left-0 w-full h-full z-10'
        />
        <div
          id='phone'
          ref={ref}
          className='w-full h-full flex flex-col font-[SF_Pro_Display]'
        >
          <PhoneHeader />
          <PhoneChat />
          <PhoneFooter />
        </div>
      </div>
      <Button type='primary' onClick={handleSaveScreenshot}>
        Сделать скриншот
      </Button>
      <Button onClick={handleResetChat}>Очистить переписку</Button>
    </div>
  );
};

export default Phone;
