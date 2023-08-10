import { FC, useState } from 'react';

import type { ChatTime } from '../../redux/state/chatSlice';
import ModalEditMessage from '../Modal/ModalEditMessage/ModalEditMessage';

const TimeChat: FC<ChatTime> = ({ chatTime, id }) => {
  const [isOpneModal, setIsOpneModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpneModal(true);
  };

  return (
    <>
      <div
        aria-hidden
        onClick={handleOpenModal}
        className='bg-[#72839166] rounded-[27px] px-[5.46px] pt-[2px] pb-[2px] text-white text-[9.36px] w-fit mx-auto mt-[13px] backdrop-blur-[100px] tracking-[0.328px]'
      >
        {chatTime}
      </div>
      <ModalEditMessage
        id={id}
        chatTime={chatTime}
        isOpneModal={isOpneModal}
        setIsOpneModal={setIsOpneModal}
      />
    </>
  );
};

export default TimeChat;
