import { Button, Checkbox, Form, Input, Radio, TimePicker } from 'antd';
import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setMessage } from '../../../redux/state/chatSlice';
import Wrapper from '../../Wrapper';
import { initialValue, options } from './SettingsChatMessage.config';
import SettingsChatMessageSticker from './SettingsChatMessageSticker';

const SettingsChatMessage: FC = () => {
  const [select, setSelect] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const onFinishMessage = (values: any) => {
    const data = {
      ...values,
      id: uuidv4(),
      time: values.time.format('HH:mm'),
    };

    if (select) {
      data.sticker = select;
    }

    dispatch(setMessage(data));
    setSelect(null);
  };

  const onSelect = (sticker: string) => {
    setSelect(sticker);
  };

  return (
    <Form
      initialValues={initialValue}
      onFinish={onFinishMessage}
      autoComplete='off'
      className='flex flex-col item-center'
    >
      <Form.Item name='type'>
        <Radio.Group options={options} />
      </Form.Item>
      <Wrapper title='Сообщение:'>
        <Form.Item name='message'>
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} className='w-80' />
        </Form.Item>
        <Form.Item
          name='time'
          rules={[{ type: 'object' as const, required: true, message: 'Выберите время' }]}
        >
          <TimePicker format={'HH:mm'} />
        </Form.Item>
      </Wrapper>
      <Form.Item name='isViewed' valuePropName='checked'>
        <Checkbox>Прочитано</Checkbox>
      </Form.Item>
      <Form.Item name='sticker'>
        <SettingsChatMessageSticker select={select} onSelect={onSelect} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SettingsChatMessage;
