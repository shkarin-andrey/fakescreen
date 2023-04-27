import { FC } from 'react';

import WifiIcon from '../../assets/icons/WifiIcon';
import { useAppSelector } from '../../hooks/useAppSelector';

const EthernetHeader: FC = () => {
  const { wifi, ethernet } = useAppSelector((state) => state.config);

  if (ethernet === 'wifi') {
    return <WifiIcon width='16' height='13' type={wifi} />;
  }

  return (
    <span className='uppercase font-semibold text-[9px] leading-none mb-[3px]'>
      {ethernet}
    </span>
  );
};

export default EthernetHeader;
