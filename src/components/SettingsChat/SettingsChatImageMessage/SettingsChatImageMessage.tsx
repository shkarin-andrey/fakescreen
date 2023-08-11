import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { FC, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { regexTime } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setMessage } from '../../../redux/state/chatSlice';
import { beforeUploadPNGAndJPEG } from '../../../utils/beforeUploadPNGAndJPEG';
import { getBase64 } from '../../../utils/getBase64';
import DropdownEmoji from '../../DropdownEmoji';

const SettingsChatImageMessage: FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const ref = useRef<HTMLDivElement>(null);

  const initialValues = {
    time: '00:00',
    type: false,
    isViewed: true,
    image: null,
    message: '',
  };

  const onFinish = (values: any) => {
    const data = {
      ...values,
      id: uuidv4(),
      type: values.type ? 'interlocutor' : 'owner',
      message: ref.current?.innerHTML,
    };

    dispatch(setMessage(data));
  };

  const handleCustomRequest: UploadProps['customRequest'] = async ({
    onSuccess,
  }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') return;

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        form.setFieldValue('image', url);
      });
    }
  };

  const handleRemove: UploadProps['onRemove'] = () => {
    form.setFieldValue('image', null);
  };

  const onEmojiClick = useCallback((event: EmojiClickData) => {
    const emoji = event.getImageUrl(EmojiStyle.APPLE);
    const elEmoji = `<img class='w-[16px] h-[16px]' src='${emoji}' alt='${event.emoji}' />`;

    if (ref.current) {
      ref.current.innerHTML += elEmoji;
    }
  }, []);

  const handleChatMessage = (e: React.ChangeEvent<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.innerHTML = e.currentTarget.innerHTML;
    }
  };

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <Form form={form} onFinish={onFinish}>
        <div className='flex items-center gap-4'>
          <div className='text-base font-medium'>Сообщение</div>
          <Button htmlType='submit' size='small' type='primary'>
            Отправить
          </Button>
        </div>
        <Divider className='my-3' />
        <Form.Item
          name='time'
          hasFeedback
          initialValue={initialValues.time}
          className='m-0'
          rules={[
            {
              pattern: new RegExp(regexTime, 'gim'),
              message: 'Пример: 01:29!',
            },
            {
              required: true,
              message: 'Введите время!',
            },
          ]}
        >
          <div className='flex items-center gap-4'>
            <div className='text-sm'>Время сообщения</div>
            <Input className='w-40' size='small' />
          </div>
        </Form.Item>
        <Divider className='my-3' />
        <Form.Item name='image' hasFeedback className='m-0' valuePropName='fileList'>
          <div className='flex items-center gap-4'>
            <div className='text-sm'>Выбрать изображение</div>
            <Upload
              onChange={handleChange}
              customRequest={handleCustomRequest}
              beforeUpload={beforeUploadPNGAndJPEG}
              onRemove={handleRemove}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </div>
        </Form.Item>
        <Divider className='my-3' />
        <Form.Item
          name='message'
          hasFeedback
          initialValue={initialValues.message}
          className='m-0'
        >
          <div className='flex items-center gap-4'>
            <div className='text-sm'>Сообщение</div>
            <div
              ref={ref}
              className='w-80 border border-solid border-gray-300 bg-white rounded-md px-2 py-1 text-base shadow-blue-500 hover:border-blue-500 transition-colors outline-none focus-visible:border-blue-500 focus-visible:shadow-md '
              onChange={handleChatMessage}
              contentEditable
              dangerouslySetInnerHTML={{ __html: ref.current?.innerHTML || '' }}
            />
            <DropdownEmoji onEmojiClick={onEmojiClick} />
          </div>
        </Form.Item>
        <Divider className='my-3' />
        <Form.Item
          name='type'
          className='m-0'
          valuePropName='checked'
          initialValue={initialValues.type}
        >
          <div className='flex items-center gap-2'>
            <Checkbox />
            <div className='text-sm'>От собеседника</div>
          </div>
        </Form.Item>
        <Form.Item
          name='isViewed'
          className='m-0'
          valuePropName='checked'
          initialValue={initialValues.isViewed}
        >
          <div className='flex items-center gap-2'>
            <Checkbox />
            <div className='text-sm'>Прочитано</div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingsChatImageMessage;
