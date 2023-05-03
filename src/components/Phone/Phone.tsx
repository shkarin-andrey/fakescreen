import {
  ClearOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { FloatButton, Modal, notification } from 'antd';
import html2canvas from 'html2canvas';
import { FC, useCallback, useMemo, useRef } from 'react';

import phoneImg from '../../assets/images/phone.svg';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { resetChat } from '../../redux/state/chatSlice';
import { blobToClipboard } from '../../utils/blobToClipboard';
import { downloadJPG } from '../../utils/downloadJPG';
import PhoneChat from './PhoneChat';
import PhoneFooter from './PhoneFooter';
import PhoneHeader from './PhoneHeader';

const { confirm } = Modal;

const Phone: FC = () => {
  const ref = useRef(null);

  const dispatch = useAppDispatch();

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

  const handleSaveScreenshot = useCallback(
    (isSave: boolean) => {
      if (ref.current) {
        html2canvas(ref.current, {
          scale: 3.5,
          allowTaint: true,
          useCORS: true,
        })
          .then((canvas) => {
            if (isSave) {
              downloadJPG(canvas);
              notification.success({ message: 'Скриншот сделан успешно' });
            } else {
              canvas.toBlob(blobToClipboard);
              notification.success({
                message: 'Скриншот успешно сохранен в буфер обмена',
              });
            }
          })
          .catch((error) => {
            console.error(error);
            notification.error({ message: error.message });
          });
      }
    },
    [ref.current],
  );

  return (
    <div className='flex flex-col gap-5 max-w-[376px] w-full '>
      <div className='h-[746px] relative py-6 px-[27px]'>
        <img
          src={phoneImg}
          alt='FakeScreen Pro phone'
          className='absolute top-0 left-0 w-full h-full z-10'
        />
        <div id='phone' ref={ref} className='w-full h-full flex flex-col'>
          <PhoneHeader />
          <PhoneChat />
          <PhoneFooter />
        </div>
      </div>
      <FloatButton.Group
        trigger='hover'
        type='primary'
        style={{ right: 20 }}
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
