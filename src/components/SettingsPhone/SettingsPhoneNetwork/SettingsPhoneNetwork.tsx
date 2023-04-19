import { Radio, RadioChangeEvent } from 'antd';
import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setNetwork, setStateSim } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';
import { itemsNetwork, itemsStateSim } from './SettingsPhoneNetwork.config';

const SettingsPhoneNetwork: FC = () => {
  const dispatch = useAppDispatch();
  const { network, stateSim } = useAppSelector((state) => state.config);

  const handleChangeNetwork = (e: RadioChangeEvent) => {
    dispatch(setNetwork(e.target.value));
  };

  const handleChangeStateNetwork = (e: RadioChangeEvent) => {
    dispatch(setStateSim(e.target.value));
  };

  return (
    <>
      <Wrapper title='Сеть:'>
        <Radio.Group onChange={handleChangeNetwork} value={network}>
          {itemsNetwork.map((item) => (
            <Radio.Button key={item.value} value={item.value}>
              {item.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Wrapper>
      {network === 'sim' && (
        <Wrapper title='Состояние сети:'>
          <Radio.Group onChange={handleChangeStateNetwork} value={stateSim}>
            {itemsStateSim.map((item) => (
              <Radio.Button key={item.value} value={item.value}>
                {item.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Wrapper>
      )}
    </>
  );
};

export default SettingsPhoneNetwork;
