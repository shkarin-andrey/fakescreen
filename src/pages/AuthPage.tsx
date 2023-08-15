import { Button, Form, Input } from 'antd';
import { RuleObject } from 'antd/es/form';
import { FC, useCallback } from 'react';

import { AUTH_CONFIG } from '../config';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setIsAuth } from '../redux/state/authSlice';
import { handleIsAuth } from '../utils/handleIsAuth';

interface IAuthState {
  login: string;
  password: string;
}

const AuthPage: FC = () => {
  const [form] = Form.useForm();
  const dispath = useAppDispatch();

  const onFinish = (values: IAuthState) => {
    localStorage.setItem('auth', JSON.stringify(values));

    dispath(setIsAuth(handleIsAuth()));
  };

  const initialValues: IAuthState = {
    login: '',
    password: '',
  };

  const errorValidate = useCallback((_: RuleObject, value: string) => {
    if (value && value !== AUTH_CONFIG.LOGIN) {
      return Promise.reject('Логин или пароль введен неверно!');
    }

    return Promise.resolve();
  }, []);

  return (
    <div className='max-w-lg flex flex-col justify-center items-center h-screen mx-auto gap-5'>
      <h1>Аутентификация</h1>
      <Form
        form={form}
        name='auth'
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete='off'
        className='w-full'
      >
        <Form.Item
          label='Логин'
          name='login'
          hasFeedback
          rules={[
            { required: true, message: 'Пожалуйста, заполните логин!' },
            {
              validator: errorValidate,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Пароль'
          name='password'
          hasFeedback
          rules={[
            { required: true, message: 'Пожалуйста, заполните пароль!' },
            {
              validator: errorValidate,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className='flex justify-center'>
          <Button type='primary' htmlType='submit'>
            Войти
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AuthPage;
