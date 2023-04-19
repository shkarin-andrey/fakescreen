import { notification } from 'antd';
import { RcFile } from 'antd/es/upload';

export const beforeUploadPNGAndJPEG = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    notification.error({ message: 'Вы можете загружать только файлы JPG/PNG!' });
  }

  return isJpgOrPng;
};
