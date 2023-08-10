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
      <div className='text-center text-gray-500 font-medium text-sm underline mb-3'>
        Как пользоваться?
      </div>
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
