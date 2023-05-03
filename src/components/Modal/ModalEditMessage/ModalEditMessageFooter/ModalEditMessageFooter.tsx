import { Button } from 'antd';
import { FC, memo } from 'react';

import { IModalEditMessageFooter } from './ModalEditMessageFooter.interface';

const ModalEditMessageFooter: FC<IModalEditMessageFooter> = ({
  handleDelete,
  handleCancel,
  handleSave,
}) => {
  return (
    <>
      <Button key='delete' danger onClick={handleDelete}>
        Удалить
      </Button>
      <Button key='back' onClick={handleCancel}>
        Отмена
      </Button>
      <Button key='save' type='primary' onClick={handleSave}>
        Сохранить
      </Button>
    </>
  );
};

export default memo(ModalEditMessageFooter);
