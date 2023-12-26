import { Checkbox, Divider, InputNumber } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FC, memo, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {
  setIsCharge,
  setIsEconom,
  setVolumeBattary,
} from '../../../redux/state/configSlice';

const SettingsPhoneBattary: FC = () => {
  const volumeBattary = useAppSelector((state) => state.config.volumeBattary);
  const isCharge = useAppSelector((state) => state.config.isCharge);
  const isEconom = useAppSelector((state) => state.config.isEconom);
  const dispatch = useAppDispatch();

  const handleChangeVolumeBattary = useCallback((newValue: any) => {
    dispatch(setVolumeBattary(newValue));
  }, []);

  const handleChangeTypeBattary = useCallback((e: CheckboxChangeEvent) => {
    if (e.target.value === 'charge') {
      dispatch(setIsCharge(e.target.checked));
    }

    if (e.target.value === 'econom') {
      dispatch(setIsEconom(e.target.checked));
    }
  }, []);

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <div className='flex items-center gap-4'>
        <div className='text-base font-medium'>Процент зарядки</div>
        <InputNumber
          min={1}
          max={100}
          value={volumeBattary}
          onChange={handleChangeVolumeBattary}
        />
      </div>
      <Divider className='my-3' />
      <div className='flex flex-col gap-3'>
        <Checkbox checked={isCharge} value={'charge'} onChange={handleChangeTypeBattary}>
          Зарядка
        </Checkbox>
        <Checkbox
          className='!m-0'
          checked={isEconom}
          value={'econom'}
          onChange={handleChangeTypeBattary}
        >
          Режим энергосбережения
        </Checkbox>
      </div>
    </div>
  );
};

export default memo(SettingsPhoneBattary);
