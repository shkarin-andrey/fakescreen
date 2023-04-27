import { DownOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  TimePicker,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { FC, useEffect, useRef, useState } from 'react';

import EmojiIcon from '../../../assets/icons/EmojiIcon';
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
  chatTime = null,
  message,
}) => {
  const [checkedViewed, setCheckedViewed] = useState(isViewed);
  const [selectType, setSelectType] = useState(type);
  const [selectTime, setSelectTime] = useState(time);
  const [changeChatTime, setChangeChatTime] = useState(chatTime);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && message && isOpneModal) {
      ref.current.innerHTML = message;
    }
  }, [isOpneModal]);

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

    const body: any = {
      index,
      data: {
        type: selectType,
        isViewed: checkedViewed,
        time: selectTime,
      },
    };

    if (changeChatTime) {
      body.data.chatTime = changeChatTime;
    }

    if (message) {
      body.data.message = ref.current?.innerHTML;
    }

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

  const handleChatMessage = (e: React.ChangeEvent<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.innerHTML = e.currentTarget.innerHTML;
    }
  };

  const onEmojiClick = (event: EmojiClickData) => {
    const emoji = event.getImageUrl(EmojiStyle.APPLE);
    const elEmoji = `<img class='w-[20px] h-[20px]' src='${emoji}' alt='${event.emoji}' />`;

    if (ref.current) {
      ref.current.innerHTML += elEmoji;
    }
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
        {chatTime && (
          <Input value={changeChatTime || ''} onChange={handleChangeChatTime} />
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
        {message && (
          <div className='flex gap-3'>
            <div
              ref={ref}
              className='w-full border border-solid border-gray-300 bg-white rounded-md px-2 py-1 text-base shadow-blue-500 hover:border-blue-500 transition-colors outline-none focus-visible:border-blue-500 focus-visible:shadow-md '
              onChange={handleChatMessage}
              contentEditable
              dangerouslySetInnerHTML={{ __html: ref.current?.innerHTML || '' }}
            />
            <Dropdown
              dropdownRender={() => (
                <EmojiPicker
                  emojiStyle={EmojiStyle.APPLE}
                  onEmojiClick={onEmojiClick}
                  lazyLoadEmojis
                  searchPlaceHolder='Поиск'
                />
              )}
              trigger={['click']}
              className='w-fit'
            >
              <Button className='flex items-center gap-1'>
                <EmojiIcon />
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalEditMessage;
