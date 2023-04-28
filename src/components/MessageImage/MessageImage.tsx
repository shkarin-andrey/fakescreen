import { Button, Popover } from 'antd';
import { FC, useState } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteMessage, Message } from '../../redux/state/chatSlice';
import MessageTime from '../MessageTime/MessageTime';

interface IMessageImage {
  id: Message['id'];
  type: Message['type'];
  image: Message['image'];
  isViewed: Message['isViewed'];
  time: Message['time'];
}

const MessageImage: FC<IMessageImage> = ({ id, type, image, isViewed, time }) => {
  const [hovered, setHovered] = useState(false);

  const dispatch = useAppDispatch();

  const handleHoverChange = (open: boolean) => {
    setHovered(open);
  };

  const handleDelete = () => {
    dispatch(deleteMessage(id));
  };

  return (
    <Popover
      content={
        <Button danger onClick={handleDelete}>
          Удалить
        </Button>
      }
      trigger='hover'
      open={hovered}
      onOpenChange={handleHoverChange}
    >
      <div className={`w-fit relative mt-[7px] ${type === 'owner' ? 'ml-auto' : ''}`}>
        <img
          className='max-w-[257px] max-h-[316px] min-w-[100px] min-h-[100px] rounded-xl'
          src={image}
          alt='imageChat'
        />
        <div className='absolute bottom-[6px] right-1'>
          <MessageTime isViewed={isViewed} type={type} time={time} isBackground />
        </div>
      </div>
    </Popover>
  );
};

export default MessageImage;
