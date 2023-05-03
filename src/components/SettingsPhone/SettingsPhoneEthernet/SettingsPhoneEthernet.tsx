import { Radio, RadioChangeEvent } from 'antd';
import { FC, memo, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setEthernet } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';
import { items } from './SettingsPhoneEthernet.config';

const SettingsPhoneEthernet: FC = () => {
  const dispatch = useAppDispatch();
  const ethernet = useAppSelector((state) => state.config.ethernet);

  const handleChangeEthernet = useCallback((e: RadioChangeEvent) => {
    dispatch(setEthernet(e.target.value));
  }, []);

  return (
    <Wrapper title='Интернет:'>
      <Radio.Group onChange={handleChangeEthernet} value={ethernet}>
        {items.map((item) => (
          <Radio.Button key={item.value} value={item.value}>
            {item.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Wrapper>
  );
};

export default memo(SettingsPhoneEthernet);
