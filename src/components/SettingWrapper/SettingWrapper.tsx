import { Button, Divider } from 'antd';
import { FC } from 'react';

import { ISettingWrapper } from './SettingWrapper.interface';

const SettingWrapper: FC<ISettingWrapper> = ({
  children,
  title,
  onClick,
  btnTitle = 'Отправить',
}) => {
  return (
    <>
      <div className='text-base font-medium'>{title}</div>
      <Divider className='my-3' />
      {children}
      <Divider className='my-3' />
      <Button onClick={onClick} htmlType='submit' size='small' type='primary'>
        {btnTitle}
      </Button>
    </>
  );
};

export default SettingWrapper;
