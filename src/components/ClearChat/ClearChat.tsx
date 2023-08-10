import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { FC, useCallback, useMemo } from 'react';

import deletetheMessage from '../../assets/images/deletetheMessage.png';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { resetChat } from '../../redux/state/chatSlice';

const { confirm } = Modal;

const ClearChat: FC = () => {
  const dispatch = useAppDispatch();

  const handleResetChat = useCallback(() => {
    dispatch(resetChat());
  }, []);

  const config = useMemo(
    () => ({
      icon: <InfoCircleOutlined />,
      title: 'Очищение переписки',
      content: <div>Вы действительно хотите очистить всю переписку?</div>,
      onOk: () => handleResetChat(),
    }),
    [],
  );

  return (
    <Button onClick={() => confirm(config)} className='flex items-center gap-2'>
      <img src={deletetheMessage} alt='Очистить переписку' />
      <span>Очистить переписку</span>
    </Button>
  );
};

export default ClearChat;
