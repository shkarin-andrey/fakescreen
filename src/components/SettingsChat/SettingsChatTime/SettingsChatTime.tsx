import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setChatTime } from '../../../redux/state/chatSlice';
import Wrapper from '../../Wrapper';
import { initialValue } from './SettingsChatTime.config';

const SettingsChatTime: FC = () => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    values.id = uuidv4();
    dispatch(setChatTime(values));
  };

  return (
    <Wrapper title='Дата переписки:'>
      <Form
        initialValues={initialValue}
        onFinish={onFinish}
        autoComplete='off'
        className='flex item-center gap-3'
      >
        <Form.Item
          name='chatTime'
          rules={[{ required: true, message: 'Введите дату переписки' }]}
        >
          <Input className='w-40' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default SettingsChatTime;
