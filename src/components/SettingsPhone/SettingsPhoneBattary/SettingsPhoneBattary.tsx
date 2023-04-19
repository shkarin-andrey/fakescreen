import { InputNumber, Radio, RadioChangeEvent, Slider } from 'antd';
import { FC, useCallback, useState } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setVolumeBattary } from '../../../redux/state/configSlice';

const SettingsPhoneBattary: FC = () => {
  const [typeBattary, setTypeBattary] = useState('charge');

  const { volumeBattary } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const handleChangeVolumeBattary = useCallback((newValue: any) => {
    dispatch(setVolumeBattary(newValue));
  }, []);

  const handleChangeTypeBattary = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setTypeBattary(e.target.value);
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
      <Radio.Group onChange={handleChangeTypeBattary} value={typeBattary}>
        <Radio value={'charge'}>Зарядка</Radio>
        <Radio value={'econom'}>Режим сбережения</Radio>
      </Radio.Group>
    </div>
  );
};

export default SettingsPhoneBattary;
