import { LOCALES } from './locales';

export const messages = {
  [LOCALES.ENGLISH]: {
    footer_phone_message: 'Message',

    interlocutor_status_online: 'online',
    interlocutor_status_scarcely: 'was just',
    interlocutor_status_recently: 'last seen recently',
    interlocutor_status_long: 'was a long time ago',
    interlocutor_status_minutesAgo: 'was {time}',
    interlocutor_status_hourseAgo: 'was {time}',
    interlocutor_status_today: 'was today in {time}',
    interlocutor_status_yesterday: 'was yesterday in {time}',
    interlocutor_status_write: 'печатает',

    header_phone_back: 'Back',

    minute_age: 'minute age',
    hour_age: 'hour age',
  },
  [LOCALES.RUSSIAN]: {
    footer_phone_message: 'Сообщение',

    interlocutor_status_online: 'в сети',
    interlocutor_status_scarcely: 'был(а) только что',
    interlocutor_status_recently: 'был(а) недавно',
    interlocutor_status_long: 'был(а) давно',
    interlocutor_status_minutesAgo: 'был(а) {time}',
    interlocutor_status_hourseAgo: 'был(а) {time}',
    interlocutor_status_today: 'был(а) сегодня в {time}',
    interlocutor_status_yesterday: 'был(а) вчера в {time}',
    interlocutor_status_write: 'печатает',

    header_phone_back: 'Назад',

    minute_age: 'минут назад',
    hour_age: 'часов назад',
  },
};
