import { Checkbox, Input, Modal, Radio, RadioChangeEvent, TimePicker } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import { FC, useState } from 'react';

import { optionsTypeMessage } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deleteMessage, updateMessage } from '../../../redux/state/chatSlice';
import { IModalEditMessage } from './ModalEditMessage.interface';
import ModalEditMessageFooter from './ModalEditMessageFooter';

const ModalEditMessage: FC<IModalEditMessage> = ({
  id,
  isOpneModal,
  setIsOpneModal,
  type,
  time,
  isViewed,
  chatTime,
}) => {
  const [checkedViewed, setCheckedViewed] = useState(isViewed);
  const [selectType, setSelectType] = useState(type);
  const [selectTime, setSelectTime] = useState(time);
  const [changeChatTime, setChangeChatTime] = useState(chatTime);

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.chat);

  const handleDelete = () => {
    dispatch(deleteMessage(id));
  };

  const handleCancel = () => {
    setIsOpneModal((prevOpen) => !prevOpen);
  };

  const handleSave = () => {
    const index = data.findIndex((el) => el.id === id);

    const body = {
      index,
      data: {
        type: selectType,
        isViewed: checkedViewed,
        time: selectTime,
        chatTime: changeChatTime,
      },
    };

    dispatch(updateMessage(body));
    handleCancel();
  };

  const handleChangeViewed = (e: CheckboxChangeEvent) => {
    setCheckedViewed(e.target.checked);
  };

  const handleSelectType = (e: RadioChangeEvent) => {
    setSelectType(e.target.value);
  };

  const handleChangeTime = (_: dayjs.Dayjs | null, value: string) => {
    setSelectTime(value);
  };

  const handleChangeChatTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeChatTime(event.target.value);
  };

  return (
    <Modal
      title='Редактирование сообщения'
      open={isOpneModal}
      onCancel={handleCancel}
      footer={
        <ModalEditMessageFooter
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      }
    >
      <div className='flex flex-col gap-3'>
        {chatTime !== undefined && (
          <Input value={changeChatTime} onChange={handleChangeChatTime} />
        )}
        {type !== undefined && (
          <Radio.Group
            value={selectType}
            options={optionsTypeMessage}
            onChange={handleSelectType}
          />
        )}
        {time !== undefined && (
          <TimePicker
            value={dayjs(selectTime, 'HH:mm')}
            onChange={handleChangeTime}
            format={'HH:mm'}
          />
        )}
        {isViewed !== undefined && (
          <Checkbox checked={checkedViewed} onChange={handleChangeViewed}>
            Прочитано
          </Checkbox>
        )}
      </div>
    </Modal>
  );
};

export default ModalEditMessage;
