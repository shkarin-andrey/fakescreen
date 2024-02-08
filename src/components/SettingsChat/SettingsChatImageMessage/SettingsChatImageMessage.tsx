/* eslint-disable simple-import-sort/imports */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Upload, UploadProps } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { RcFile, UploadFile } from 'antd/es/upload';
import { FC, useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setMessage } from '../../../redux/state/chatSlice';
import { beforeUploadPNGAndJPEG } from '../../../utils/beforeUploadPNGAndJPEG';
import { getBase64 } from '../../../utils/getBase64';
import { handleCustomRequest } from '../../../utils/handleCustomRequest';
import DropdownEmoji from '../../DropdownEmoji';
import SettingWrapper from '../../SettingWrapper';
import { initialValues, timeRules } from './SettingsChatImageMessage.config';

const SettingsChatImageMessage: FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const ref = useRef<HTMLDivElement>(null);

  const images = useAppSelector((state) => state.config.images);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.slice(-2);
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
    if (info.file.status === 'uploading') return;

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        form.setFieldValue('image', url);
      });
    }
  };

  const handleRemove = () => {
    setFileList([]);
    form.setFieldValue('image', null);
  };

  const onEmojiClick = useCallback(
    (index: number) => {
      if (ref.current) {
        ref.current.innerHTML += `<img class="w-[16px] h-[16px] object-contain" src="${images[index]}" alt="emoji-${index}"/>`;
      }
    },
    [images],
  );

  const onFinish = useCallback(
    (values: any) => {
      const data = {
        ...values,
        id: uuidv4(),
        type: values.type ? 'interlocutor' : 'owner',
        fileList,
      };

      data.message = ref.current?.innerHTML.replace(/(style=.*"|&nbsp;)+/gm, '');

      if (ref.current?.innerHTML !== '' || fileList.length !== 0) {
        setTimeout(() => {
          dispatch(setMessage(data));
          handleRemove();

          if (ref.current) {
            ref.current.innerHTML = '';
          }
        }, 0);
      }
    },
    [fileList.length],
  );

  const handleChangeMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      if (!e.currentTarget.textContent) {
        setTimeout(() => {
          if (!ref.current) return;
          ref.current.innerHTML = '';
        }, 10);

        return;
      }

      form.submit();
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
          <Form.Item name='image' hasFeedback className='m-0'>
            <div className='flex items-center gap-4'>
              <div className='text-sm'>Выбрать изображение</div>
              <Upload
                onChange={handleChange}
                customRequest={handleCustomRequest}
                beforeUpload={beforeUploadPNGAndJPEG}
                onRemove={handleRemove}
                maxCount={1}
                fileList={fileList}
              >
                <Button icon={<UploadOutlined />}>Загрузить</Button>
              </Upload>
            </div>
          </Form.Item>
          <Divider className='my-3' />
          <div className='flex items-center gap-4'>
            <div className='text-sm'>Сообщение</div>
            <div
              ref={ref}
              onKeyDown={handleChangeMessage}
              role='presentation'
              className='w-80 border border-solid border-gray-300 bg-white rounded-md px-2 py-1 text-base shadow-blue-500 hover:border-blue-500 transition-colors outline-none focus-visible:border-blue-500 focus-visible:shadow-md '
              style={{
                wordBreak: 'break-word',
              }}
              contentEditable
              dangerouslySetInnerHTML={{ __html: ref.current?.innerHTML || '' }}
            />
            <DropdownEmoji images={images} onEmojiClick={onEmojiClick} />
          </div>
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
