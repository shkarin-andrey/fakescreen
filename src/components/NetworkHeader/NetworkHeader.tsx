import { FC, memo } from 'react';

import AviaIcon from '../../assets/icons/AviaIcon';
import SimIcon from '../../assets/icons/SimIcon';
import { useAppSelector } from '../../hooks/useAppSelector';
import { INetworkHeader } from './NetworkHeader.interface';

const NetworkHeader: FC<INetworkHeader> = ({ className = '' }) => {
  const network = useAppSelector((state) => state.config.network);
  const stateSim = useAppSelector((state) => state.config.stateSim);

  if (network === 'sim') {
    return <SimIcon width='15' height='10' type={stateSim} />;
  }

  return <AviaIcon width='14' height='10' className={className} />;
};

export default memo(NetworkHeader);
