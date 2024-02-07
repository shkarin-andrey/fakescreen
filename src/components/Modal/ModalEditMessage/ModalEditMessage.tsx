/* eslint-disable simple-import-sort/imports */
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Upload,
  UploadProps,
} from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { RcFile, UploadFile } from 'antd/es/upload';
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';

import { optionsTypeMessage } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deleteMessage, updateMessage } from '../../../redux/state/chatSlice';
import { beforeUploadPNGAndJPEG } from '../../../utils/beforeUploadPNGAndJPEG';
import { generateAudioList } from '../../../utils/generateAudioList';
import { getBase64 } from '../../../utils/getBase64';
import { handleCustomRequest } from '../../../utils/handleCustomRequest';
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
  image = '',
  defaultFileList = [],
}) => {
  const initialValue = {
    type,
    message,
    time,
    isViewed,
    isListened,
    chatTime,
    image,
    sticker: stickerUrl,
    audioMessage: seconds,
    audioList: seconds ? generateAudioList(seconds) : null,
  };

  const [form] = Form.useForm<typeof initialValue>();
  const stickerValue = Form.useWatch('sticker', form);

  const images = useAppSelector((state) => state.config.images);

  const ref = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);

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

  const handleSelectSticker = useCallback((sticker: string) => {
    form.setFieldValue('sticker', sticker);
  }, []);

  const onEmojiClick = useCallback(
    (index: number) => {
      if (ref.current) {
        ref.current.innerHTML += `<img class="w-[16px] h-[16px] object-contain" src="${images[index]}" alt="emoji-${index}"/>`;
      }
    },
    [images],
  );

  const onFinish = (values: typeof initialValue) => {
    const index = data.findIndex((el) => el.id === id);

    const body: any = {
      index,
      data: {
        ...values,
        fileList,
        audioList: values?.audioMessage
          ? generateAudioList(values.audioMessage)
          : undefined,
      },
    };

    body.data.message = ref.current?.innerHTML.replace(/(style=.*"|&nbsp;)+/gm, '');

    if (ref.current?.innerHTML !== '' || fileList.length !== 0) {
      setTimeout(() => {
        dispatch(updateMessage(body));
        handleCancel();

        if (ref.current) {
          ref.current.innerHTML = '';
        }
      }, 0);
    }
  };

  const handleUpload: UploadProps['onChange'] = (info) => {
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

  const handleRemove: UploadProps['onRemove'] = () => {
    form.setFieldValue('image', null);
  };

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
              role='presentation'
              onKeyDown={handleChangeMessage}
              className='w-full border border-solid border-gray-300 bg-white rounded-md px-2 py-1 text-base shadow-blue-500 hover:border-blue-500 transition-colors outline-none focus-visible:border-blue-500 focus-visible:shadow-md '
              contentEditable
              dangerouslySetInnerHTML={{ __html: ref.current?.innerHTML || '' }}
            />
            <DropdownEmoji images={images} onEmojiClick={onEmojiClick} />
          </div>
        )}
        {image && (
          <Form.Item name='image' hasFeedback className='m-0'>
            <Upload
              onChange={handleUpload}
              customRequest={handleCustomRequest}
              beforeUpload={beforeUploadPNGAndJPEG}
              onRemove={handleRemove}
              fileList={fileList}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </Form.Item>
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
        {isListened !== undefined && (
          <Form.Item className='m-0' name='isListened' valuePropName='checked'>
            <Checkbox>Прослушано</Checkbox>
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
