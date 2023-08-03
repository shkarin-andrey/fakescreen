import { FC, useState } from 'react';

import type { ChatTime } from '../../redux/state/chatSlice';
import ModalEditMessage from '../Modal/ModalEditMessage/ModalEditMessage';

type ITimeChat = ChatTime;

const TimeChat: FC<ITimeChat> = ({ chatTime, id }) => {
  const [isOpneModal, setIsOpneModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpneModal(true);
  };

  return (
    <>
      <div
        aria-hidden
        onClick={handleOpenModal}
        className='bg-[#72839166] rounded-[27px] px-[6px] pt-[1px] pb-[3px] text-white text-xs w-fit mx-auto mt-[13px] backdrop-blur-[100px]'
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
