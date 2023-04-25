import { CloseOutlined } from '@ant-design/icons';
import { Radio, RadioChangeEvent } from 'antd';
import { FC } from 'react';

import GeoBlueIcon from '../../../assets/icons/GeoBlueIcon';
import GeoFillIcon from '../../../assets/icons/GeoFillIcon';
import GeoOutlineIcon from '../../../assets/icons/GeoOutlineIcon';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setGeo } from '../../../redux/state/configSlice';
import Wrapper from '../../Wrapper';

const SettingsPhoneGeo: FC = () => {
  const dispatch = useAppDispatch();
  const { geo } = useAppSelector((state) => state.config);

  const handleChangeGeo = (e: RadioChangeEvent) => {
    dispatch(setGeo(e.target.value));
  };

  return (
    <Wrapper title='Геолокация:'>
      <Radio.Group onChange={handleChangeGeo} value={geo} className='flex'>
        <Radio.Button value='outline' className='flex justify-center items-center'>
          <GeoOutlineIcon />
        </Radio.Button>
        <Radio.Button value='fill' className='flex justify-center items-center'>
          <GeoFillIcon />
        </Radio.Button>
        <Radio.Button value='blue' className='flex justify-center items-center'>
          <GeoBlueIcon />
        </Radio.Button>
        <Radio.Button className='flex justify-center items-center'>
          <CloseOutlined style={{ color: 'red' }} />
        </Radio.Button>
      </Radio.Group>
    </Wrapper>
  );
};

export default SettingsPhoneGeo;
