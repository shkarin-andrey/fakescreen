import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { FC, memo, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { regexTime } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setMessage } from '../../../redux/state/chatSlice';
import { initialValue } from './SettingsChatMessage.config';
import SettingsChatMessageSticker from './SettingsChatMessageSticker';

const SettingsChatMessage: FC = () => {
  const [select, setSelect] = useState<string | null>(null);

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const onFinishMessage = (values: any) => {
    const data = {
      ...values,
      id: uuidv4(),
      message: '',
      sticker: select,
    };

    dispatch(setMessage(data));
    setSelect(null);
  };

  const onSelect = useCallback((sticker: string) => {
    setSelect(sticker);
  }, []);

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <Form
        form={form}
        initialValues={initialValue}
        onFinish={onFinishMessage}
        autoComplete='off'
        className='flex flex-col item-center'
      >
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
        <Form.Item name='sticker'>
          <SettingsChatMessageSticker select={select} onSelect={onSelect} />
        </Form.Item>
        <Divider className='my-3' />
        <Form.Item name='type' className='m-0' valuePropName='checked'>
          <div className='flex items-center gap-2'>
            <Checkbox />
            <div className='text-sm'>От собеседника</div>
          </div>
        </Form.Item>
        <Form.Item name='isViewed' className='m-0' valuePropName='checked'>
          <div className='flex items-center gap-2'>
            <Checkbox />
            <div className='text-sm'>Прочитано</div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(SettingsChatMessage);
