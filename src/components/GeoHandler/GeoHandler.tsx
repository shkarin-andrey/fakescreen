import { FC, memo } from 'react';

import GeoBlueIcon from '../../assets/icons/GeoBlueIcon';
import GeoFillIcon from '../../assets/icons/GeoFillIcon';
import GeoOutlineIcon from '../../assets/icons/GeoOutlineIcon';
import { useAppSelector } from '../../hooks/useAppSelector';

const GeoHandler: FC = () => {
  const geo = useAppSelector((state) => state.config.geo);

  if (geo === 'outline') {
    return <GeoOutlineIcon className='mt-[1px]' />;
  }

  if (geo === 'fill') {
    return <GeoFillIcon className='mt-[1px]' />;
  }

  if (geo === 'blue') {
    return (
      <div className='mt-[4.5px]'>
        <GeoBlueIcon />
      </div>
    );
  }

  return null;
};

export default memo(GeoHandler);
