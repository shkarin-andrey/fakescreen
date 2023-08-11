import { Button, Checkbox, Divider, Form, Input, InputNumber } from 'antd';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { regexTime } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setMessage } from '../../../redux/state/chatSlice';
import { initialValues } from './SettingsChatAudioMessage.config';

const SettingsChatAudioMessage: FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const data = {
      ...values,
      id: uuidv4(),
      type: values.type ? 'interlocutor' : 'owner',
    };

    dispatch(setMessage(data));
  };

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <Form form={form} onFinish={onFinish} initialValues={initialValues}>
        <div className='flex items-center gap-4'>
          <div className='text-base font-medium'>Аудиосообщение</div>
          <Button htmlType='submit' size='small' type='primary'>
            Отправить
          </Button>
        </div>
        <Divider className='my-3' />
        <Form.Item
          name='time'
          hasFeedback
          className='m-0'
          label='Время сообщения'
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
          <Input className='w-40' size='small' />
        </Form.Item>
        <Divider className='my-3' />
        <Form.Item
          name='audioMessage'
          hasFeedback
          className='m-0'
          label='Длительность'
          rules={[
            {
              required: true,
              message: 'Введите длительность!',
            },
          ]}
        >
          <InputNumber min={1} max={99} className='w-40' size='small' />
        </Form.Item>
        <Divider className='my-3' />
        <Form.Item name='type' className='m-0' valuePropName='checked'>
          <Checkbox>От собеседника</Checkbox>
        </Form.Item>
        <Form.Item name='isViewed' className='m-0' valuePropName='checked'>
          <Checkbox>Прочитано</Checkbox>
        </Form.Item>
        <Form.Item name='isListened' className='m-0' valuePropName='checked'>
          <Checkbox>Прослушано</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingsChatAudioMessage;
