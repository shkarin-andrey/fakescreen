import {
  ClearOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { FloatButton, Modal, notification } from 'antd';
import { toPng } from 'html-to-image';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import phoneImg from '../../assets/images/phone.svg';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { resetChat } from '../../redux/state/chatSlice';
import { copyImgToClipboard } from '../../utils/copyImgToClipboard';
import { downloadJPG } from '../../utils/downloadJPG';
import PhoneChat from './PhoneChat';
import PhoneFooter from './PhoneFooter';
import PhoneHeader from './PhoneHeader';

const { confirm } = Modal;

const Phone: FC = () => {
  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);
  const [chatClass, setChatClass] = useState('overflow-y-scroll');
  const dispatch = useAppDispatch();
  const allState = useAppSelector((state) => state);

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
    async (isSave: boolean) => {
      // if (ref.current) {
      // setChatClass('overflow-hidden');

      // toPng(ref.current, {
      //   quality: 1,
      //   canvasWidth: 828,
      //   canvasHeight: 1792,
      // })
      //   .then((dataUrl) => {
      //     if (isSave) {
      //       downloadJPG(dataUrl);
      //       notification.success({ message: 'Скриншот успешно загружен' });
      //     } else {
      //       copyImgToClipboard(dataUrl);
      //     }
      //   })
      //   .catch((error) => {
      //     notification.error({ message: error.message });
      //   })
      //   .finally(() => {
      //     setChatClass('overflow-auto');
      //   });

      const blob = await new Blob([JSON.stringify(allState)], {
        type: 'application/json',
      });
      const url = await URL.createObjectURL(blob);
      // navigate(url);
      console.log(url);

      // const newBlob = new Blob([url], {
      //   type: 'application/json',
      // });
      // console.log(blob, newBlob);
      // console.log(JSON.stringify(allState).length);
      // console.log(allState);
      // console.log(new URL(JSON.stringify(allState)));

      // console.log(url);

      // fetch(url)
      //   .then((res) => res.json())
      //   .then((data) => console.log(data));
      // }
    },
    [allState],
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
          <PhoneChat className={chatClass} />
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
