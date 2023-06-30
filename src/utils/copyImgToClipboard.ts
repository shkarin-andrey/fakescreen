import { notification } from 'antd';

export const copyImgToClipboard = async (imgUrl: string) => {
  try {
    const data = await fetch(imgUrl);
    const blob = await data.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    notification.success({
      message: 'Скриншот успешно сохранен в буфер обмена',
    });
  } catch (err) {
    notification.error({
      message: (err as Error).name,
      description: (err as Error).message,
    });
  }
};
