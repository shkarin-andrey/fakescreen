import { Divider, Radio, RadioChangeEvent } from 'antd';
import { FC, memo, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setNetwork, setStateSim } from '../../../redux/state/configSlice';
import { itemsNetwork, itemsStateSim } from './SettingsPhoneNetwork.config';

// TODO: Вынести в отдельный компонент SIM
const SettingsPhoneNetwork: FC = () => {
  const dispatch = useAppDispatch();
  const network = useAppSelector((state) => state.config.network);
  const stateSim = useAppSelector((state) => state.config.stateSim);

  const handleChangeNetwork = useCallback((e: RadioChangeEvent) => {
    dispatch(setNetwork(e.target.value));
  }, []);

  const handleChangeStateNetwork = useCallback((e: RadioChangeEvent) => {
    dispatch(setStateSim(e.target.value));
  }, []);

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <div className='flex items-center gap-4'>
        <div className='text-base font-medium'>Сеть</div>
        <Radio.Group onChange={handleChangeNetwork} value={network}>
          {itemsNetwork.map((item) => (
            <Radio.Button key={item.value} value={item.value}>
              {item.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      {network === 'sim' && (
        <>
          <Divider className='my-3' />
          <div className='text-sm mb-2'>Состояние сети</div>
          <Radio.Group onChange={handleChangeStateNetwork} value={stateSim}>
            {itemsStateSim.map((item) => (
              <Radio.Button key={item.value} value={item.value}>
                {item.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </>
      )}
    </div>
  );
};

export default memo(SettingsPhoneNetwork);
