import { FC, memo } from 'react';

import AviaIcon from '../../assets/icons/AviaIcon';
import SimIcon from '../../assets/icons/SimIcon';
import { useAppSelector } from '../../hooks/useAppSelector';

const NetworkHeader: FC = () => {
  const network = useAppSelector((state) => state.config.network);
  const stateSim = useAppSelector((state) => state.config.stateSim);

  if (network === 'sim') {
    return <SimIcon width='14' height='10' type={stateSim} />;
  }

  return <AviaIcon width='14' height='10' />;
};

export default memo(NetworkHeader);
