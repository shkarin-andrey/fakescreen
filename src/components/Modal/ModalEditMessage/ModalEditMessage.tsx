import { Checkbox, Input, Modal, Radio, RadioChangeEvent, TimePicker } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';

import { optionsTypeMessage } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deleteMessage, updateMessage } from '../../../redux/state/chatSlice';
import DropdownEmoji from '../../DropdownEmoji';
import { IModalEditMessage, IModalEditMessageSave } from './ModalEditMessage.interface';
import ModalEditMessageFooter from './ModalEditMessageFooter';

const ModalEditMessage: FC<IModalEditMessage> = ({
  id,
  isOpneModal,
  setIsOpneModal,
  type,
  time,
  isViewed,
  isListened,
  chatTime = null,
  message,
  seconds,
}) => {
  const [checkedViewed, setCheckedViewed] = useState(isViewed);
  const [checkedListened, setCheckedListened] = useState(isListened);
  const [selectType, setSelectType] = useState(type);
  const [selectTime, setSelectTime] = useState(time);
  const [selectSeconds, setSelectSeconds] = useState(seconds?.toString());
  const [changeChatTime, setChangeChatTime] = useState(chatTime);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && message && isOpneModal) {
      ref.current.innerHTML = message;
    }
  }, [isOpneModal]);

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.chat.data);

  const handleDelete = useCallback(() => {
    dispatch(deleteMessage(id));
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpneModal((prevOpen) => !prevOpen);
  }, []);

  const handleSave = useCallback(() => {
    const index = data.findIndex((el) => el.id === id);

    const body: IModalEditMessageSave = {
      index,
      data: {
        type: selectType,
        isViewed: checkedViewed,
        time: selectTime,
        isListened: checkedListened,
      },
    };

    if (changeChatTime) {
      body.data.chatTime = changeChatTime;
    }

    if (selectSeconds) {
      body.data.audioMessage = parseInt(selectSeconds, 10);
    }

    if (message) {
      body.data.message = ref.current?.innerHTML;
    }

    dispatch(updateMessage(body));
    handleCancel();
  }, [
    data,
    id,
    selectType,
    checkedViewed,
    checkedListened,
    selectTime,
    selectSeconds,
    changeChatTime,
    ref.current,
  ]);

  const handleChangeViewed = useCallback((e: CheckboxChangeEvent) => {
    setCheckedViewed(e.target.checked);
  }, []);

  const handleChangeListened = useCallback((e: CheckboxChangeEvent) => {
    setCheckedListened(e.target.checked);
  }, []);

  const handleSelectType = useCallback((e: RadioChangeEvent) => {
    setSelectType(e.target.value);
  }, []);

  const handleChangeTime = useCallback((_: dayjs.Dayjs | null, value: string) => {
    setSelectTime(value);
  }, []);

  const handleChangeSeconds = useCallback((_: dayjs.Dayjs | null, value: string) => {
    setSelectSeconds(value);
  }, []);

  const handleChangeChatTime = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setChangeChatTime(event.target.value);
    },
    [],
  );

  const handleChatMessage = useCallback(
    (e: React.ChangeEvent<HTMLDivElement>) => {
      if (ref.current) {
        ref.current.innerHTML = e.currentTarget.innerHTML;
      }
    },
    [ref.current],
  );

  const onEmojiClick = useCallback((event: EmojiClickData) => {
    const emoji = event.getImageUrl(EmojiStyle.APPLE);
    const elEmoji = `<img class='w-[20px] h-[20px]' src='${emoji}' alt='${event.emoji}' />`;

    if (ref.current) {
      ref.current.innerHTML += elEmoji;
    }
  }, []);

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
            <DropdownEmoji onEmojiClick={onEmojiClick} />
          </div>
        )}
        {seconds && (
          <TimePicker
            value={dayjs(selectSeconds, 'ss')}
            onChange={handleChangeSeconds}
            format={'ss'}
          />
        )}
        {isListened !== undefined && (
          <Checkbox checked={checkedListened} onChange={handleChangeListened}>
            Прослушанно
          </Checkbox>
        )}
      </div>
    </Modal>
  );
};

export default memo(ModalEditMessage);
