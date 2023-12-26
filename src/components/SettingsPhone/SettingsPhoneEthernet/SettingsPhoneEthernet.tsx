import { Divider, Radio, RadioChangeEvent } from 'antd';
import { FC, memo, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setEthernet } from '../../../redux/state/configSlice';
import SettingsPhoneWifi from '../SettingsPhoneWifi';
import { items } from './SettingsPhoneEthernet.config';

const SettingsPhoneEthernet: FC = () => {
  const dispatch = useAppDispatch();
  const ethernet = useAppSelector((state) => state.config.ethernet);

  const handleChangeEthernet = useCallback((e: RadioChangeEvent) => {
    dispatch(setEthernet(e.target.value));
  }, []);

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <div className='flex items-center gap-4'>
        <div className='text-base font-medium'>Интернет</div>
        <Radio.Group onChange={handleChangeEthernet} value={ethernet}>
          {items.map((item) => (
            <Radio.Button key={item.value} value={item.value}>
              {item.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      {ethernet === 'wifi' && (
        <>
          <Divider className='my-3' />
          <SettingsPhoneWifi />
        </>
      )}
    </div>
  );
};

export default memo(SettingsPhoneEthernet);
