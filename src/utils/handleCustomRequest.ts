import { UploadProps } from 'antd';

export const handleCustomRequest: UploadProps['customRequest'] = ({ onSuccess }: any) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 0);
};
