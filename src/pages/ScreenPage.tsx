import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import PhoneChat from '../components/Phone/PhoneChat/PhoneChat';
import PhoneFooter from '../components/Phone/PhoneFooter/PhoneFooter';
import PhoneHeader from '../components/Phone/PhoneHeader/PhoneHeader';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setGlobalChat } from '../redux/state/chatSlice';
import { setGlobalConfig } from '../redux/state/configSlice';
import { setLanguage } from '../redux/state/languageSlice';

const ScreenPage: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  // const [globalState, setGlobalState] = useState({});

  useEffect(() => {
    fetch('blob:https://fakescreen-beta.vercel.app' + location.pathname)
      .then((res) => res.json())
      // .then((data) => setGlobalState(data));
      .then((data) => {
        console.log(data.chat);

        dispatch(setGlobalConfig(data.config));
        dispatch(setLanguage(data.language.language));
        dispatch(setGlobalChat(data.chat));
      });
  }, []);

  return (
    <div className='flex justify-center items-center min-h-[2000px]'>
      <div
        id='phone'
        className='h-[698px] w-[322px] flex flex-col relative scale-[2.572]'
      >
        <PhoneHeader />
        <PhoneChat className={''} />
        <PhoneFooter />
      </div>
    </div>
  );
};

export default ScreenPage;
