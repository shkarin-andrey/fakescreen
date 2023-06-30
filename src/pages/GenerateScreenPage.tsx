import React, { FC, useCallback, useMemo, useState } from 'react';

import Layout from '../components/Layout';
import Phone from '../components/Phone';
import SettingsChat from '../components/SettingsChat';
import SettingsInterlocutor from '../components/SettingsInterlocutor';
import SettingsPhone from '../components/SettingsPhone';
import StepsScreen from '../components/StepsScreen';
import Title from '../components/Title';

const GenerateScreenPage: FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = useCallback((value: number) => {
    setCurrent(value);
  }, []);

  const items = useMemo(
    () => [
      {
        title: 'Настройки iPhone',
        description: 'Настройте параметры телефона',
        content: <SettingsPhone />,
      },
      {
        title: 'Настройки Собеседника',
        description: 'Настройте параметры собеседника',
        content: <SettingsInterlocutor />,
      },
      {
        title: 'Настройки Переписки',
        description: 'Настройте сообщения ',
        content: <SettingsChat />,
      },
    ],
    [],
  );

  return (
    <Layout>
      <div className='flex justify-center'>
        <Title />
      </div>
      <StepsScreen current={current} onChange={onChange} items={items} />
      <div className='flex justify-between gap-10 mt-20'>
        <div>{items[current].content}</div>
        <Phone />
      </div>
    </Layout>
  );
};

export default GenerateScreenPage;
