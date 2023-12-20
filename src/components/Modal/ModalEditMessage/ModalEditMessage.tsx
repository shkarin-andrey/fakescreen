import { Checkbox, Form, Input, InputNumber, Modal, Radio } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import React, { FC, memo, useCallback, useEffect, useRef } from 'react';

import { optionsTypeMessage } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deleteMessage, updateMessage } from '../../../redux/state/chatSlice';
import { generateAudioList } from '../../../utils/generateAudioList';
import { htmlEmoji } from '../../../utils/htmlEmoji';
import DropdownEmoji from '../../DropdownEmoji';
import SettingsChatMessageSticker from '../../SettingsChat/SettingsChatMessage/SettingsChatMessageSticker';
import { IModalEditMessage } from './ModalEditMessage.interface';
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
  message = '',
  seconds,
  stickerUrl = '',
}) => {
  const initialValue = {
    type,
    message,
    time,
    isViewed,
    isListened,
    chatTime,
    sticker: stickerUrl,
    audioMessage: seconds,
    audioList: seconds ? generateAudioList(seconds) : null,
  };

  const [form] = Form.useForm<typeof initialValue>();
  const stickerValue = Form.useWatch('sticker', form);

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

  const handleChatMessage = (e: React.ChangeEvent<HTMLDivElement>) => {
    const value = e.target.innerHTML;

    if (ref.current) {
      ref.current.innerHTML = value;
    }
  };

  const handleSelectSticker = useCallback((sticker: string) => {
    form.setFieldValue('sticker', sticker);
  }, []);

  const onEmojiClick = useCallback((event: EmojiClickData) => {
    const emoji = event.getImageUrl(EmojiStyle.APPLE);

    if (ref.current) {
      ref.current.innerHTML += htmlEmoji(emoji, event.emoji);
    }
  }, []);

  const onFinish = (values: typeof initialValue) => {
    const index = data.findIndex((el) => el.id === id);

    const body = {
      index,
      data: {
        ...values,
        message: ref.current?.innerHTML,
        audioList: values?.audioMessage
          ? generateAudioList(values.audioMessage)
          : undefined,
      },
    };

    dispatch(updateMessage(body));
    handleCancel();
  };

  return (
    <Modal
      title='Редактирование сообщения'
      open={isOpneModal}
      onCancel={handleCancel}
      footer={
        <ModalEditMessageFooter
          handleSave={form.submit}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      }
    >
      <Form
        form={form}
        initialValues={initialValue}
        onFinish={onFinish}
        autoComplete='off'
        className='flex flex-col gap-3'
      >
        {chatTime && (
          <Form.Item className='m-0' name='chatTime'>
            <Input />
          </Form.Item>
        )}
        {type !== undefined && (
          <Form.Item className='m-0' name='type'>
            <Radio.Group options={optionsTypeMessage} />
          </Form.Item>
        )}
        {time !== undefined && (
          <Form.Item className='m-0' name='time'>
            <MaskedInput size='small' className='w-40' mask={'00:00'} />
          </Form.Item>
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
          <Form.Item className='m-0' name='audioMessage'>
            <InputNumber min={1} max={99} className='w-40' size='small' />
          </Form.Item>
        )}
        {isViewed !== undefined && (
          <Form.Item className='m-0' name='isViewed' valuePropName='checked'>
            <Checkbox>Прочитано</Checkbox>
          </Form.Item>
        )}
        {isListened && (
          <Form.Item className='m-0' name='isListened' valuePropName='checked'>
            <Checkbox disabled={form.getFieldValue('isViewed')}>Прослушано</Checkbox>
          </Form.Item>
        )}
        {stickerUrl && (
          <Form.Item className='m-0' name='sticker'>
            <SettingsChatMessageSticker
              select={stickerValue}
              onSelect={handleSelectSticker}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default memo(ModalEditMessage);
