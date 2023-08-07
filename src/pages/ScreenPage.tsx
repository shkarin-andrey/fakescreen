import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PhoneChat from '../components/Phone/PhoneChat/PhoneChat';
import PhoneFooter from '../components/Phone/PhoneFooter/PhoneFooter';
import PhoneHeader from '../components/Phone/PhoneHeader/PhoneHeader';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useDownloadFileQuery } from '../redux/api/state';
import { setGlobalChat } from '../redux/state/chatSlice';
import { setGlobalConfig } from '../redux/state/configSlice';
import { setLanguage } from '../redux/state/languageSlice';
import { setTheme } from '../redux/state/themeState';

const ScreenPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: dataState } = useDownloadFileQuery(`${id}.json` || '');

  const dispatch = useAppDispatch();
  const bgImage = useAppSelector((state) => state.config.bgImage);

  useEffect(() => {
    if (!dataState) return;

    dispatch(setGlobalConfig(dataState.data.config));
    dispatch(setLanguage(dataState.data.language.language));
    dispatch(setGlobalChat(dataState.data.chat));
    dispatch(setTheme(dataState.data.theme.theme));
  }, [dataState]);

  useEffect(() => {
    if (bgImage) {
      document.body.style.backgroundImage = `url('${bgImage}')`;
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = 'cover';
    }
  }, [bgImage]);

  return (
    <div className='relative min-h-[1792px]'>
      <div
        id='phone'
        className='h-[697px] w-[322px] flex flex-col scale-[2.572] absolute top-[548px] left-[253px]'
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
  );
};

export default ScreenPage;
