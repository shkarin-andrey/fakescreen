import { Checkbox, Divider, Form, InputNumber } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { regexTime } from '../../../config';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setMessage } from '../../../redux/state/chatSlice';
import { generateAudioList } from '../../../utils/generateAudioList';
import SettingWrapper from '../../SettingWrapper';
import { initialValues } from './SettingsChatAudioMessage.config';

const SettingsChatAudioMessage: FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const data = {
      ...values,
      id: uuidv4(),
      type: values.type ? 'interlocutor' : 'owner',
      audioList: generateAudioList(values.audioMessage),
    };

    dispatch(setMessage(data));
    form.resetFields();
  };

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <Form form={form} onFinish={onFinish} initialValues={initialValues}>
        <SettingWrapper title='Аудиосообщение'>
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
            <MaskedInput size='small' className='w-40' mask={'00:00'} />
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
        </SettingWrapper>
      </Form>
    </div>
  );
};

export default SettingsChatAudioMessage;
