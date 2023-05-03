import { Button, Popover } from 'antd';
import { FC, memo, useCallback, useState } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteMessage } from '../../redux/state/chatSlice';
import MessageTime from '../MessageTime/MessageTime';
import { IMessageSticker } from './MessageSticker.interface';

const MessageSticker: FC<IMessageSticker> = ({ id, isViewed, type, sticker, time }) => {
  const [hovered, setHovered] = useState(false);

  const dispatch = useAppDispatch();

  const handleHoverChange = useCallback((open: boolean) => {
    setHovered(open);
  }, []);

  const handleDelete = useCallback(() => {
    dispatch(deleteMessage(id));
  }, []);

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
      <div className={`w-40 h-40 relative mt-[7px] ${type === 'owner' ? 'ml-auto' : ''}`}>
        <img className='w-full h-full object-cover' src={sticker} alt='' />
        <div className='absolute bottom-[6px] right-1'>
          <MessageTime isViewed={isViewed} type={type} time={time} isBackground />
        </div>
      </div>
    </Popover>
  );
};

export default memo(MessageSticker);
