import SettingsChat from '../SettingsChat';
import SettingsInterlocutor from '../SettingsInterlocutor';
import SettingsPhone from '../SettingsPhone';

export const menuList = [
  {
    title: '📱 Настройки Iphone ',
    description: 'Сеть, батарея, время',
    content: <SettingsPhone />,
  },
  {
    title: '🗣️ Настройки собеседника ',
    description: 'Имя, аватар, состояние в сети',
    content: <SettingsInterlocutor />,
  },
  {
    title: '💬 Настройки сообщений',
    description: 'Текст, фото, аудио, стикеры',
    content: <SettingsChat />,
  },
];
