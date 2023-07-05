import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PhoneChat from '../components/Phone/PhoneChat/PhoneChat';
import PhoneFooter from '../components/Phone/PhoneFooter/PhoneFooter';
import PhoneHeader from '../components/Phone/PhoneHeader/PhoneHeader';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useGetStateIdQuery } from '../redux/api/state';
import { setGlobalChat } from '../redux/state/chatSlice';
import { setGlobalConfig } from '../redux/state/configSlice';
import { setLanguage } from '../redux/state/languageSlice';

const ScreenPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: dataState } = useGetStateIdQuery(id || '');

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!dataState) return;
    dispatch(setGlobalConfig(dataState.data.config));
    dispatch(setLanguage(dataState.data.language.language));
    dispatch(setGlobalChat(dataState.data.chat));
  }, [dataState]);

  return (
    <div className='relative  min-h-[2000px]'>
      <div
        id='phone'
        className='h-[697px] w-[322px] flex flex-col  scale-[2.572] absolute top-[549px] left-[253px]'
      >
        <PhoneHeader />
        <PhoneChat />
        <PhoneFooter />
      </div>
    </div>
  );
};

export default ScreenPage;
