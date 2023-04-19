import { FC } from 'react';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { setBgImage } from '../../../redux/state/configSlice';
import Image from '../../Image';
import { useAppDispatch } from './../../../hooks/useAppDispatch';
import { gallary } from './SettingsInterlocutorIGallary.config';

const SettingsInterlocutorIGallary: FC = () => {
  const dispatch = useAppDispatch();
  const { bgImage } = useAppSelector((state) => state.config);

  const handleClick = (src: string) => {
    if (bgImage === src) {
      return;
    }
    dispatch(setBgImage(src));
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='font-medium text-base'>Галерея:</div>
      <div className='flex flex-wrap gap-5'>
        {gallary.map((img) => (
          <Image key={img} src={img} onClick={handleClick} select={bgImage} />
        ))}
      </div>
    </div>
  );
};

export default SettingsInterlocutorIGallary;
