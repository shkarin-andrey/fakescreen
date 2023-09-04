/* eslint-disable simple-import-sort/imports */
import { Checkbox, Input, InputNumber, Modal, Radio, RadioChangeEvent } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';

import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import { optionsTypeMessage } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deleteMessage, updateMessage } from '../../../redux/state/chatSlice';
import { generateAudioList } from '../../../utils/generateAudioList';
import { htmlEmoji } from '../../../utils/htmlEmoji';
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
  const [selectSeconds, setSelectSeconds] = useState(seconds);
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
      body.data.audioMessage = selectSeconds;
      body.data.audioList = generateAudioList(selectSeconds);
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

    if (!e.target.checked) {
      setCheckedListened(false);
    }
  }, []);

  const handleChangeListened = useCallback((e: CheckboxChangeEvent) => {
    setCheckedListened(e.target.checked);
  }, []);

  const handleSelectType = useCallback((e: RadioChangeEvent) => {
    setSelectType(e.target.value);
  }, []);

  const handleChangeTime: MaskedInputProps['onChange'] = (e) => {
    setSelectTime(e.target.value);
  };

  const handleChangeSeconds = useCallback((value: number | null) => {
    if (!value) return;
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

    if (ref.current) {
      ref.current.innerHTML += htmlEmoji(emoji, event.emoji);
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
          <MaskedInput
            size='small'
            className='w-40'
            value={selectTime}
            mask={'00:00'}
            onChange={handleChangeTime}
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
          <InputNumber
            min={1}
            max={99}
            className='w-40'
            size='small'
            value={selectSeconds}
            onChange={handleChangeSeconds}
          />
        )}
        {isListened !== undefined && (
          <Checkbox
            checked={checkedListened}
            disabled={!checkedViewed}
            onChange={handleChangeListened}
          >
            Прослушано
          </Checkbox>
        )}
      </div>
    </Modal>
  );
};

export default memo(ModalEditMessage);
