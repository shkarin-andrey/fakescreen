import { ClearOutlined, InfoCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { FloatButton, Modal, notification } from 'antd';
import { FC, useCallback, useMemo, useRef } from 'react';

import phoneImg from '../../assets/images/phone.svg';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useUploadFileMutation } from '../../redux/api/state';
import { resetChat } from '../../redux/state/chatSlice';
import PhoneChat from './PhoneChat';
import PhoneFooter from './PhoneFooter';
import PhoneHeader from './PhoneHeader';

const { confirm } = Modal;

const { VITE_APP_BASE_URL } = import.meta.env;

const Phone: FC = () => {
  const [uploadFile] = useUploadFileMutation();

  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat);
  const configState = useAppSelector((state) => state.config);
  const languageState = useAppSelector((state) => state.language);
  const themeState = useAppSelector((state) => state.theme);
  const bgImage = useAppSelector((state) => state.config.bgImage);

  const handleResetChat = useCallback(() => {
    dispatch(resetChat());
  }, []);

  const config = useMemo(
    () => ({
      icon: <InfoCircleOutlined />,
      title: 'Очищение переписки',
      content: <div>Вы действительно хотите очистить всю переписку?</div>,
      onOk: () => handleResetChat(),
    }),
    [],
  );

  const handleGetScreenshot = useCallback((id: string) => {
    const url = VITE_APP_BASE_URL + id;
    window.open(url, '_blank', 'noreferrer');
  }, []);

  const handleSaveScreenshot = useCallback(async () => {
    const fileName = `data.json`;
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
  }, [chatState, configState, languageState, themeState, handleGetScreenshot]);

  return (
    <div className='flex flex-col gap-5 max-w-[376px] min-w-[376px]'>
      <div
        className='h-[746px] relative py-6 px-[27px]'
        style={{
          borderImageSource: `url(${phoneImg})`,
          borderImageSlice: '120 100 140 fill',
          borderImageRepeat: 'repeat stretch',
          borderImageWidth: '115px 101px 133px',
        }}
      >
        <div
          id='phone'
          ref={ref}
          className='w-full h-full flex flex-col relative flex-1 rounded-[30px] overflow-hidden'
          style={{
            backgroundImage: `url('${bgImage}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <PhoneHeader />
          <PhoneChat />
          <PhoneFooter />
        </div>
      </div>
      <FloatButton.Group
        trigger='click'
        type='primary'
        style={{ right: 20, zIndex: 102 }}
        icon={<SaveOutlined />}
      >
        <FloatButton
          onClick={() => {
            confirm(config);
          }}
          icon={<ClearOutlined />}
          tooltip={'Очистить переписку'}
        />
        <FloatButton
          onClick={handleSaveScreenshot}
          icon={<SaveOutlined />}
          tooltip={'Просмотреть превью'}
        />
      </FloatButton.Group>
    </div>
  );
};

export default Phone;
