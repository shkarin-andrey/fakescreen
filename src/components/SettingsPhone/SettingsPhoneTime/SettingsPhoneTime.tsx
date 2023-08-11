/* eslint-disable simple-import-sort/imports */
import { Button, Form } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { Store } from 'antd/es/form/interface';
import { FC, memo } from 'react';

import { regexTime } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setTime } from '../../../redux/state/configSlice';

const SettingsPhoneTime: FC = () => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const time = useAppSelector((state) => state.config.time);

  const onFinish = (values: Store) => {
    dispatch(setTime(values.time));
  };

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <Form
        form={form}
        onFinish={onFinish}
        className='flex items-center gap-4'
        initialValues={{ time }}
      >
        <div className='text-base font-medium'>Время на устройстве</div>
        <Form.Item
          name='time'
          hasFeedback
          className='w-20 m-0'
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
          <MaskedInput size='small' mask={'00:00'} />
        </Form.Item>
        <Button htmlType='submit' type='primary' size='small'>
          Добавить
        </Button>
      </Form>
    </div>
  );
};

export default memo(SettingsPhoneTime);
