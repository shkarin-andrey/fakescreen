import { Button, Checkbox, Divider, Form, Input, InputNumber } from 'antd';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { regexTime } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setMessage } from '../../../redux/state/chatSlice';

const SettingsChatAudioMessage: FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const initialValues = {
    time: '00:00',
    audioMessage: 10,
    type: false,
    isViewed: true,
  };

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
      <Form form={form} onFinish={onFinish}>
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
        <Form.Item
          name='audioMessage'
          hasFeedback
          initialValue={initialValues.audioMessage}
          className='m-0'
          rules={[
            {
              required: true,
              message: 'Введите длительность!',
            },
          ]}
        >
          <div className='flex items-center gap-4'>
            <div className='text-sm'>Длительность</div>
            <InputNumber min={1} max={99} className='w-40' size='small' />
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

export default SettingsChatAudioMessage;
