import { RcFile } from 'antd/es/upload';

type TUploadFile = 'url' | 'text';

export const getBase64 = (
  img: RcFile,
  callback: (url: string) => void,
  type: TUploadFile = 'url',
) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));

  if (type === 'text') {
    reader.readAsText(img);
  }

  if (type === 'url') {
    reader.readAsDataURL(img);
  }
};
