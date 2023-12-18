import { FC, memo, useState } from 'react';

import MessageTime from '../MessageTime/MessageTime';
import ModalEditMessage from '../Modal/ModalEditMessage';
import { IMessageSticker } from './MessageSticker.interface';

const MessageSticker: FC<IMessageSticker> = ({ id, isViewed, type, sticker, time }) => {
  const [hovered, setHovered] = useState(false);

  const handleOpenModal = (open: boolean) => () => {
    setHovered(open);
  };

  return (
    <>
      <div
        aria-hidden={true}
        onClick={handleOpenModal(true)}
        className={`w-40 h-40 relative mt-[7px] ${type === 'owner' ? 'ml-auto' : ''}`}
      >
        <img className='w-full h-full object-cover' src={sticker} alt='' />
        <div className='absolute bottom-[6px] right-1'>
          <MessageTime isViewed={isViewed} type={type} time={time} isBackground />
        </div>
      </div>
      <ModalEditMessage
        id={id}
        type={type}
        time={time}
        isViewed={isViewed}
        isOpneModal={hovered}
        setIsOpneModal={setHovered}
        stickerUrl={sticker}
      />
    </>
  );
};

export default memo(MessageSticker);
