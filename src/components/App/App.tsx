import { FC, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { useAppSelector } from '../../hooks/useAppSelector';
import { messages } from '../../i18n/messages';
import Layout from '../Layout';
import Phone from '../Phone';
import SettingsChat from '../SettingsChat/SettingsChat';
import SettingsInterlocutor from '../SettingsInterlocutor';
import SettingsPhone from '../SettingsPhone';
import StepsScreen from '../StepsScreen';
import Title from '../Title';

const App: FC = () => {
  const [current, setCurrent] = useState(2);

  const { language } = useAppSelector((state) => state.language);

  const onChange = (value: number) => {
    setCurrent(value);
  };

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
    <IntlProvider
      messages={messages[language]}
      locale={language}
      defaultLocale={language}
    >
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
    </IntlProvider>
  );
};

export default App;
