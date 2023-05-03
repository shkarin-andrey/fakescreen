import { FC, memo } from 'react';

import WifiIcon from '../../assets/icons/WifiIcon';
import { useAppSelector } from '../../hooks/useAppSelector';

const EthernetHeader: FC = () => {
  const wifi = useAppSelector((state) => state.config.wifi);
  const ethernet = useAppSelector((state) => state.config.ethernet);

  if (ethernet === 'wifi') {
    return <WifiIcon width='16' height='13' type={wifi} />;
  }

  return (
    <span className='uppercase font-semibold text-[9px] leading-none mb-[3px]'>
      {ethernet}
    </span>
  );
};

export default memo(EthernetHeader);
