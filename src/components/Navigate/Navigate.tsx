import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Steps, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { FC, useCallback } from 'react';

import eyes from '../../assets/images/eyes.png';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setGlobalChat } from '../../redux/state/chatSlice';
import { setGlobalConfig } from '../../redux/state/configSlice';
import { setLanguage } from '../../redux/state/languageSlice';
import { setStep } from '../../redux/state/menuSlice';
import { setTheme } from '../../redux/state/themeState';
import { getBase64 } from '../../utils/getBase64';
import { handleCustomRequest } from '../../utils/handleCustomRequest';
import ClearChat from '../ClearChat';
import PreviewScreenshot from '../PreviewScreenshot';
import Title from '../Title';
import { menuList } from './Navigate.config';

const { VITE_APP_LINK_INFO_USE } = import.meta.env;

const Navigate: FC = () => {
  const dispatch = useAppDispatch();

  const step = useAppSelector((state) => state.menu.step);

  const onChange = useCallback((value: number) => {
    dispatch(setStep(value));
  }, []);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') return;

    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj as RcFile,
        (data) => {
          const dataState = JSON.parse(data);

          dispatch(setGlobalConfig(dataState.data.config));
          dispatch(setLanguage(dataState.data.language.language));
          dispatch(setGlobalChat(dataState.data.chat));
          dispatch(setTheme(dataState.data.theme.theme));
        },
        'text',
      );
    }
  };

  return (
    <div>
      <Title />
      <a
        href={VITE_APP_LINK_INFO_USE}
        className='block text-center text-gray-500 font-medium text-sm underline mb-3'
        target='_blank'
        rel='noreferrer'
      >
        Как пользоваться?
      </a>
      <div className='bg-white'>
        <div className='px-4 text-lg font-medium py-2'>Меню</div>
        <Divider className='my-1' />
        <Steps
          current={step}
          onChange={onChange}
          items={menuList}
          className='px-2 py-3'
          direction='vertical'
        />
      </div>
      <div className='mt-5 bg-white'>
        <div className='text-lg font-medium py-2 px-4'>Управление настройками</div>
        <Divider className='my-1' />
        <div className='flex gap-3 items-center justify-center pb-2 pt-1'>
          <PreviewScreenshot title='Скачать' exportFile img={<DownloadOutlined />} />
          <Upload
            onChange={handleChange}
            customRequest={handleCustomRequest}
            showUploadList={false}
          >
            <Button>
              <DownloadOutlined className='rotate-180' />
              Загрузить
            </Button>
          </Upload>
        </div>
      </div>
      <div className='flex flex-col items-center gap-2 mt-5'>
        <ClearChat />
        <PreviewScreenshot title='Посмотреть превью' type='primary' img={eyes} />
      </div>
    </div>
  );
};

export default Navigate;
