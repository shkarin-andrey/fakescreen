import { Button } from 'antd';
import { FC } from 'react';

import phoneImg from '../../assets/images/phone.svg';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { resetChat } from '../../redux/state/chatSlice';
import PhoneChat from './PhoneChat';
import PhoneFooter from './PhoneFooter';
import PhoneHeader from './PhoneHeader';

const Phone: FC = () => {
  const dispatch = useAppDispatch();

  const handleResetChat = () => {
    dispatch(resetChat());
  };

  return (
    <div className='flex flex-col gap-5 max-w-[375px] w-full '>
      <div className='h-[746px] relative py-6 px-[27px]'>
        <img
          src={phoneImg}
          alt='FakeScreen Pro phone'
          className='absolute top-0 left-0 w-full h-full z-10'
        />
        <div className='w-full h-full rounded-[55px] flex flex-col'>
          <PhoneHeader />
          <PhoneChat />
          <PhoneFooter />
        </div>
      </div>
      <Button onClick={handleResetChat}> Очистить переписку</Button>
    </div>
  );
};

export default Phone;
