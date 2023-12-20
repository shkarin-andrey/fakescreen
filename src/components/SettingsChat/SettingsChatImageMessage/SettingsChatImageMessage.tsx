/* eslint-disable simple-import-sort/imports */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Upload, UploadProps } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { RcFile } from 'antd/es/upload';
import { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { FC, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setMessage } from '../../../redux/state/chatSlice';
import { beforeUploadPNGAndJPEG } from '../../../utils/beforeUploadPNGAndJPEG';
import { getBase64 } from '../../../utils/getBase64';
import { handleCustomRequest } from '../../../utils/handleCustomRequest';
import { htmlEmoji } from '../../../utils/htmlEmoji';
import DropdownEmoji from '../../DropdownEmoji';
import SettingWrapper from '../../SettingWrapper';
import { initialValues, timeRules } from './SettingsChatImageMessage.config';

const SettingsChatImageMessage: FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const ref = useRef<HTMLDivElement>(null);

  const onFinish = (values: any) => {
    const data = {
      ...values,
      id: uuidv4(),
      type: values.type ? 'interlocutor' : 'owner',
      message: ref.current?.innerHTML,
    };

    dispatch(setMessage(data));
    form.resetFields();
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

    if (ref.current) {
      ref.current.innerHTML += htmlEmoji(emoji, event.emoji);
    }
  }, []);

  const handleChatMessage = (e: React.ChangeEvent<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.innerHTML = e.currentTarget.innerHTML;
    }
  };

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <Form form={form} onFinish={onFinish} initialValues={initialValues}>
        <SettingWrapper title='Сообщение'>
          <Form.Item
            name='time'
            hasFeedback
            className='m-0'
            label='Время сообщения'
            rules={timeRules}
          >
            <MaskedInput size='small' className='w-40' mask={'00:00'} />
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
          <Form.Item name='message' hasFeedback className='m-0'>
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
          <Form.Item name='type' className='m-0' valuePropName='checked'>
            <Checkbox>От собеседника</Checkbox>
          </Form.Item>
          <Form.Item name='isViewed' className='m-0' valuePropName='checked'>
            <Checkbox>Прочитано</Checkbox>
          </Form.Item>
        </SettingWrapper>
      </Form>
    </div>
  );
};

export default SettingsChatImageMessage;
