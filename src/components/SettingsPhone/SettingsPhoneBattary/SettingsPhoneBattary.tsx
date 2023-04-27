import { Checkbox, InputNumber, Slider } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FC, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {
  setIsCharge,
  setIsEconom,
  setVolumeBattary,
} from '../../../redux/state/configSlice';

const SettingsPhoneBattary: FC = () => {
  const { volumeBattary, isCharge, isEconom } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const handleChangeVolumeBattary = useCallback((newValue: any) => {
    dispatch(setVolumeBattary(newValue));
  }, []);

  const handleChangeTypeBattary = (e: CheckboxChangeEvent) => {
    if (e.target.value === 'charge') {
      dispatch(setIsCharge(e.target.checked));
    }

    if (e.target.value === 'econom') {
      dispatch(setIsEconom(e.target.checked));
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='font-medium text-base'>Заряд батареи:</div>
      <div className='grid grid-cols-4 gap-4'>
        <Slider
          className='col-span-3'
          min={1}
          max={100}
          onChange={handleChangeVolumeBattary}
          value={typeof volumeBattary === 'number' ? volumeBattary : 0}
        />
        <InputNumber
          min={1}
          max={100}
          value={volumeBattary}
          onChange={handleChangeVolumeBattary}
        />
      </div>
      <div className='flex items-center gap-3'>
        <Checkbox checked={isCharge} value={'charge'} onChange={handleChangeTypeBattary}>
          Зарядка
        </Checkbox>
        <Checkbox checked={isEconom} value={'econom'} onChange={handleChangeTypeBattary}>
          Режим сбережения
        </Checkbox>
      </div>
    </div>
  );
};

export default SettingsPhoneBattary;
