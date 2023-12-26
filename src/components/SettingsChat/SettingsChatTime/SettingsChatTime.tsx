import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setChatTime } from '../../../redux/state/chatSlice';
import { initialValue } from './SettingsChatTime.config';

const SettingsChatTime: FC = () => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    values.id = uuidv4();
    dispatch(setChatTime(values));
  };

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <Form
        initialValues={initialValue}
        onFinish={onFinish}
        autoComplete='off'
        className='flex items-center gap-3'
      >
        <div className='text-base font-medium'>Дата пересписки</div>
        <Form.Item
          name='chatTime'
          className='!m-0'
          rules={[{ required: true, message: 'Введите дату переписки' }]}
        >
          <Input className='w-40' size='small' />
        </Form.Item>
        <Button type='primary' htmlType='submit' size='small'>
          Добавить
        </Button>
      </Form>
    </div>
  );
};

export default SettingsChatTime;
