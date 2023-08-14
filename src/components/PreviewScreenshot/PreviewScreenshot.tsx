import { Button, notification } from 'antd';
import { FC, useCallback } from 'react';
import ReactGa from 'react-ga';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useUploadFileMutation } from '../../redux/api/state';
import { download } from '../../utils/download';
import { IPreviewScreenshot } from './PreviewScreenshot.interface';

const { VITE_APP_BASE_URL } = import.meta.env;

const PreviewScreenshot: FC<IPreviewScreenshot> = ({ title, type, img, exportFile }) => {
  const [uploadFile] = useUploadFileMutation();

  const chatState = useAppSelector((state) => state.chat);
  const configState = useAppSelector((state) => state.config);
  const languageState = useAppSelector((state) => state.language);
  const themeState = useAppSelector((state) => state.theme);

  const handleGetScreenshot = useCallback((id: string) => {
    const url = VITE_APP_BASE_URL + id;
    window.open(url, '_blank', 'noreferrer');
  }, []);

  const handleSaveScreenshot = useCallback(() => {
    ReactGa.event({
      category: `Кнопка: "${title}"`,
      action: 'clickBtnPreview',
      label: 'Preview scrennshot',
    });

    const time = new Date();

    const fileName = `fakescreen-config-${time.toLocaleTimeString()}.json`;
    const dictstring = {
      data: {
        chat: chatState,
        config: configState,
        language: languageState,
        theme: themeState,
      },
    };

    const blob = new Blob([JSON.stringify(dictstring, null, 2)], {
      type: 'application/json',
    });

    if (exportFile) {
      const link = window.URL.createObjectURL(blob);
      return download(fileName, link);
    }

    const data = new FormData();
    data.append('file', blob, fileName);

    uploadFile(data)
      .unwrap()
      .then((res) => {
        handleGetScreenshot(res.id);
      })
      .catch((error) => {
        if (Array.isArray(error.message)) {
          return notification.error({ message: error.message.join('\b') });
        }

        return notification.error({ message: error.message });
      });
  }, [
    chatState,
    configState,
    languageState,
    themeState,
    handleGetScreenshot,
    download,
    exportFile,
  ]);

  return (
    <Button
      onClick={handleSaveScreenshot}
      type={type}
      className='flex items-center gap-2'
    >
      {img && <img src={img} alt={title} />}
      <span>{title}</span>
    </Button>
  );
};

export default PreviewScreenshot;
