import { FC } from 'react';

import GeoBlueIcon from '../../assets/icons/GeoBlueIcon';
import GeoFillIcon from '../../assets/icons/GeoFillIcon';
import GeoOutlineIcon from '../../assets/icons/GeoOutlineIcon';
import { useAppSelector } from '../../hooks/useAppSelector';

const GeoHandler: FC = () => {
  const { geo } = useAppSelector((state) => state.config);

  if (geo === 'outline') {
    return <GeoOutlineIcon />;
  }

  if (geo === 'fill') {
    return <GeoFillIcon />;
  }

  return <GeoBlueIcon />;
};

export default GeoHandler;
