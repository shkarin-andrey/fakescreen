import { FC } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import SettingsPhoneBattary from './SettingsPhoneBattary';
import SettingsPhoneEthernet from './SettingsPhoneEthernet';
import SettingsPhoneGeo from './SettingsPhoneGeo';
import SettingsPhoneNetwork from './SettingsPhoneNetwork';
import SettingsPhoneTime from './SettingsPhoneTime';
import SettingsPhoneWatermark from './SettingsPhoneWatermark';
import SettingsPhoneWifi from './SettingsPhoneWifi';

const SettingsPhone: FC = () => {
  const { ethernet } = useAppSelector((state) => state.config);

  return (
    <div className='flex flex-col gap-10'>
      <SettingsPhoneBattary />
      <SettingsPhoneTime />
      <SettingsPhoneGeo />
      <SettingsPhoneEthernet />
      {ethernet === 'wifi' && <SettingsPhoneWifi />}
      <SettingsPhoneNetwork />
      <SettingsPhoneWatermark />
    </div>
  );
};

export default SettingsPhone;
