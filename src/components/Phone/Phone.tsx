import {
  ClearOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { FloatButton, Modal, notification } from 'antd';
import { FC, useCallback, useMemo, useRef } from 'react';

import phoneImg from '../../assets/images/phone.svg';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useLazyGetScreenshotQuery, useSaveStateMutation } from '../../redux/api/state';
import { resetChat } from '../../redux/state/chatSlice';
import { blobToClipboard } from '../../utils/blobToClipboard';
import { downloadJPG } from './../../utils/downloadJPG';
import PhoneChat from './PhoneChat';
import PhoneFooter from './PhoneFooter';
import PhoneHeader from './PhoneHeader';

const { confirm } = Modal;

const Phone: FC = () => {
  const [getScreenshot] = useLazyGetScreenshotQuery();

  const [saveState] = useSaveStateMutation();

  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat);
  const configState = useAppSelector((state) => state.config);
  const languageState = useAppSelector((state) => state.language);

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

  const handleGetScreenshot = useCallback(
    (id: string, isSave: boolean) => {
      getScreenshot(id)
        .unwrap()
        .then((blobScreen) => {
          if (isSave) {
            downloadJPG(URL.createObjectURL(blobScreen));
            notification.success({ message: 'Скриншот успешно сгенерирован' });
          } else {
            blobToClipboard(blobScreen);
            notification.success({
              message: 'Скриншот успешно сохранен в буфер обмена',
            });
          }
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    },
    [getScreenshot],
  );

  const handleSaveScreenshot = useCallback(
    (isSave: boolean) => {
      saveState({
        data: {
          chat: chatState,
          config: configState,
          language: languageState,
        },
      })
        .unwrap()
        .then((res: any) => {
          handleGetScreenshot(res._id, isSave);
        })
        .catch((error: any) => {
          if (Array.isArray(error.message)) {
            return notification.error({ message: error.message.join('\b') });
          }

          return notification.error({ message: error.message });
        });
    },
    [chatState, configState, languageState, handleGetScreenshot],
  );

  return (
    <div className='flex flex-col gap-5 max-w-[376px] min-w-[376px] '>
      <div className='h-[746px] relative py-6 px-[27px]'>
        <img
          src={phoneImg}
          alt='FakeScreen Pro phone'
          className='absolute top-0 left-0 w-full h-full z-10'
        />
        <div id='phone' ref={ref} className='w-full h-full flex flex-col relative'>
          <PhoneHeader />
          <PhoneChat />
          <PhoneFooter />
        </div>
      </div>
      <FloatButton.Group
        trigger='click'
        type='primary'
        style={{ right: 20, zIndex: 101 }}
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
          onClick={() => handleSaveScreenshot(false)}
          icon={<CopyOutlined />}
          tooltip={'Скопировать скриншот'}
        />
        <FloatButton
          onClick={() => handleSaveScreenshot(true)}
          icon={<SaveOutlined />}
          tooltip={'Сохранить скриншот'}
        />
      </FloatButton.Group>
    </div>
  );
};

export default Phone;
