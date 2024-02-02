import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { FC, useCallback, useMemo, useState } from 'react';

import deletetheMessage from '../../assets/images/deletetheMessage.png';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { resetChat } from '../../redux/state/chatSlice';

const { confirm } = Modal;

const ClearChat: FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();

  const handleResetChat = useCallback(() => {
    dispatch(resetChat());
    setIsDisabled(false);
  }, []);

  const config = useMemo(
    () => ({
      icon: <InfoCircleOutlined />,
      title: 'Очищение переписки',
      content: <div>Вы действительно хотите очистить всю переписку?</div>,
      onOk: () => handleResetChat(),
      onCancel: () => setIsDisabled(false),
    }),
    [],
  );

  const handleOpenModal = () => {
    setIsDisabled(true);
    confirm(config);
  };

  return (
    <Button
      onClick={handleOpenModal}
      disabled={isDisabled}
      className='flex items-center gap-2'
    >
      <img src={deletetheMessage} alt='Очистить переписку' />
      <span>Очистить переписку</span>
    </Button>
  );
};

export default ClearChat;
