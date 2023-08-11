import { Divider, Steps } from 'antd';
import { FC, useCallback } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setStep } from '../../redux/state/menuSlice';
import ClearChat from '../ClearChat';
import PreviewScreenshot from '../PreviewScreenshot';
import Title from '../Title';
import { menuList } from './Navigate.config';

const Navigate: FC = () => {
  const dispatch = useAppDispatch();

  const step = useAppSelector((state) => state.menu.step);

  const onChange = useCallback((value: number) => {
    dispatch(setStep(value));
  }, []);

  return (
    <div>
      <Title />
      <a
        href='https://docs.google.com/document/d/1e4hVJTdQn_UUWkgXpgffpGZGJxo5xEQ6_T-c4yIovOw/edit#heading=h.oeynp7xxt5na'
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
      <div className='flex flex-col items-center gap-2 mt-5'>
        <ClearChat />
        <PreviewScreenshot />
      </div>
    </div>
  );
};

export default Navigate;
