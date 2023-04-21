import { FC } from 'react';

import AviaIcon from '../../assets/icons/AviaIcon';
import SimIcon from '../../assets/icons/SimIcon';
import { useAppSelector } from '../../hooks/useAppSelector';

const NetworkHeader: FC = () => {
  const { network, stateSim } = useAppSelector((state) => state.config);

  if (network === 'sim') {
    return <SimIcon width='14' height='10' type={stateSim} />;
  }

  return <AviaIcon width='14' height='10' />;
};

export default NetworkHeader;
