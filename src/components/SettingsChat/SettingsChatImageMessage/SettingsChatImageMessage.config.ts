import { regexTime } from '../../../config';

export const initialValues = {
  time: '00:00',
  type: false,
  isViewed: true,
  image: null,
  message: '',
};

export const timeRules = [
  {
    pattern: new RegExp(regexTime, 'gim'),
    message: 'Пример: 01:29!',
  },
  {
    required: true,
    message: 'Введите время!',
  },
];
