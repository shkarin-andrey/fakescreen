import { Button, Checkbox, Form, Radio, TimePicker } from 'antd';
import { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { FC, memo, useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { optionsTypeMessage } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setMessage } from '../../../redux/state/chatSlice';
import DropdownEmoji from '../../DropdownEmoji';
import Wrapper from '../../Wrapper';
import SettingsChatImage from './SettingsChatImage';
import { initialValue } from './SettingsChatMessage.config';
import SettingsChatMessageSticker from './SettingsChatMessageSticker';

const SettingsChatMessage: FC = () => {
  const [select, setSelect] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const handleChatMessage = (e: React.ChangeEvent<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.innerHTML = e.currentTarget.innerHTML;
    }
  };

  const onFinishMessage = (values: any) => {
    const data = {
      ...values,
      id: uuidv4(),
      time: values.time.format('HH:mm'),
      message: ref.current?.innerHTML,
      audioMessage: null,
    };

    if (select) {
      data.sticker = select;
    }

    if (image) {
      data.image = image;
    }

    if (values.audioMessage) {
      const seconds = parseInt(values.audioMessage.format('ss'), 10);

      if (seconds > 0) {
        data.audioMessage = seconds;
      }
    }

    dispatch(setMessage(data));
    setSelect(null);
    setImage(null);

    if (ref.current) {
      ref.current.innerHTML = '';
    }

    form.setFieldValue('audioMessage', null);
  };

  const onSelect = useCallback((sticker: string) => {
    setSelect(sticker);
  }, []);

  const onEmojiClick = useCallback((event: EmojiClickData) => {
    const emoji = event.getImageUrl(EmojiStyle.APPLE);
    const elEmoji = `<img class='w-[16px] h-[16px]' src='${emoji}' alt='${event.emoji}' />`;

    if (ref.current) {
      ref.current.innerHTML += elEmoji;
    }
  }, []);

  return (
    <Form
      form={form}
      initialValues={initialValue}
      onFinish={onFinishMessage}
      autoComplete='off'
      className='flex flex-col item-center'
    >
      <Form.Item name='type'>
        <Radio.Group options={optionsTypeMessage} />
      </Form.Item>
      <Wrapper title='Сообщение:'>
        <div
          ref={ref}
          className='w-80 border border-solid border-gray-300 bg-white rounded-md px-2 py-1 text-base shadow-blue-500 hover:border-blue-500 transition-colors outline-none focus-visible:border-blue-500 focus-visible:shadow-md '
          onChange={handleChatMessage}
          contentEditable
          dangerouslySetInnerHTML={{ __html: ref.current?.innerHTML || '' }}
        />
        <DropdownEmoji onEmojiClick={onEmojiClick} />
        <Form.Item
          name='time'
          rules={[{ type: 'object' as const, required: true, message: 'Выберите время' }]}
        >
          <TimePicker format={'HH:mm'} />
        </Form.Item>
      </Wrapper>
      <Form.Item name='isViewed' valuePropName='checked'>
        <Checkbox>Прочитано</Checkbox>
      </Form.Item>
      <Wrapper title='Голосовое сообщение:'>
        <Form.Item name='audioMessage'>
          <TimePicker format={'ss'} />
        </Form.Item>
      </Wrapper>
      <Form.Item name='isListened' valuePropName='checked'>
        <Checkbox>Прослушано</Checkbox>
      </Form.Item>
      <SettingsChatImage image={image} setImage={setImage} />
      <Form.Item name='sticker'>
        <SettingsChatMessageSticker select={select} onSelect={onSelect} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' size='large'>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(SettingsChatMessage);
