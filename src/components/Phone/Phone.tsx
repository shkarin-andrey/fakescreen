import { ClearOutlined, InfoCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { FloatButton, Modal, notification } from 'antd';
import { FC, useCallback, useMemo, useRef } from 'react';

import phoneImg from '../../assets/images/phone.svg';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useLazyGetScreenshotQuery, useSaveStateMutation } from '../../redux/api/state';
import { resetChat } from '../../redux/state/chatSlice';
import PhoneChat from './PhoneChat';
import PhoneFooter from './PhoneFooter';
import PhoneHeader from './PhoneHeader';

const { confirm } = Modal;

const { VITE_APP_BASE_URL } = import.meta.env;

const Phone: FC = () => {
  const [getScreenshot] = useLazyGetScreenshotQuery();

  const [saveState] = useSaveStateMutation();

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

  const handleSaveScreenshot = useCallback(() => {
    saveState({
      data: {
        chat: chatState,
        config: configState,
        language: languageState,
        theme: themeState,
      },
    })
      .unwrap()
      .then((res: any) => {
        handleGetScreenshot(res._id);
      })
      .catch((error: any) => {
        if (Array.isArray(error.message)) {
          return notification.error({ message: error.message.join('\b') });
        }

        return notification.error({ message: error.message });
      });
  }, [chatState, configState, languageState, themeState, handleGetScreenshot]);

  return (
    <div className='flex flex-col gap-5 max-w-[376px] min-w-[376px] '>
      <div className='h-[746px] relative py-6 px-[27px]'>
        <img
          src={phoneImg}
          alt='FakeScreen Pro phone'
          className='absolute top-0 left-0 w-full h-full z-10'
        />
        <div
          id='phone'
          ref={ref}
          className='w-full h-full flex flex-col relative flex-1'
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
