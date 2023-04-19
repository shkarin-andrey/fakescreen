import { FC } from 'react';

import WifiIcon from '../../assets/icons/WifiIcon';
import { useAppSelector } from '../../hooks/useAppSelector';

const EthernetHeader: FC = () => {
  const { wifi, ethernet } = useAppSelector((state) => state.config);

  if (ethernet === 'wifi') {
    return <WifiIcon width='13.11' height='10' type={wifi} />;
  }

  return <span className='uppercase font-medium'>{ethernet}</span>;
};

export default EthernetHeader;
