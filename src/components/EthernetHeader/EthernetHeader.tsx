import { FC, memo } from 'react';

import Ethernet3GIcon from '../../assets/icons/Ethernet3GIcon';
import EthernetEIcon from '../../assets/icons/EthernetEIcon';
import EthernetLTEIcon from '../../assets/icons/EthernetLTEIcon';
import WifiIcon from '../../assets/icons/WifiIcon';
import { useAppSelector } from '../../hooks/useAppSelector';

const EthernetHeader: FC = () => {
  const wifi = useAppSelector((state) => state.config.wifi);
  const ethernet = useAppSelector((state) => state.config.ethernet);

  if (ethernet === 'wifi') {
    return <WifiIcon width='13' height='10' type={wifi} isSettings={false} />;
  }

  if (ethernet === 'e') {
    return <EthernetEIcon />;
  }

  if (ethernet === '3g') {
    return <Ethernet3GIcon />;
  }

  if (ethernet === 'lte') {
    return <EthernetLTEIcon />;
  }

  return null;
};

export default memo(EthernetHeader);
