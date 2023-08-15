import { FC, memo } from 'react';

import SettingsPhoneBattary from './SettingsPhoneBattary';
import SettingsPhoneEthernet from './SettingsPhoneEthernet';
import SettingsPhoneGeo from './SettingsPhoneGeo';
import SettingsPhoneLocal from './SettingsPhoneLocal';
import SettingsPhoneNetwork from './SettingsPhoneNetwork';
import SettingsPhoneTheme from './SettingsPhoneTheme';
import SettingsPhoneTime from './SettingsPhoneTime';
import SettingsPhoneWatermark from './SettingsPhoneWatermark';

const SettingsPhone: FC = () => {
  return (
    <div className='flex flex-col gap-3'>
      <SettingsPhoneTime />
      <SettingsPhoneBattary />
      <SettingsPhoneGeo />
      <SettingsPhoneTheme />
      <SettingsPhoneLocal />
      <SettingsPhoneEthernet />
      <SettingsPhoneNetwork />
      <SettingsPhoneWatermark />
    </div>
  );
};

export default memo(SettingsPhone);
