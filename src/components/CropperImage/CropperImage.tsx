import { Modal } from 'antd';
import { FC, memo, useCallback, useState } from 'react';
import { FixedCropper, StencilSize } from 'react-advanced-cropper';

import EditCardImage from '../EditCardImage';
import { TStencilSize } from '../EditCardImage/EditCardImage.interface';
import { horizonSize, squareSize, verticalSize } from './CropperImage.config';
import { ICropperImage } from './CropperImage.interface';

const CropperImage: FC<ICropperImage> = ({ isOpen, image, onOk, onChange, onCancel }) => {
  const [size, setSize] = useState<StencilSize>(verticalSize);
  const [selectType, setSelectType] = useState<TStencilSize>('vertical');

  const handleSelectTypeSize = useCallback((type: TStencilSize) => {
    setSelectType(type);

    if (type === 'vertical') setSize(verticalSize);
    if (type === 'square') setSize(squareSize);
    if (type === 'horizon') setSize(horizonSize);
  }, []);

  return (
    <Modal
      title='Редактирование изображения'
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div className='flex justify-around gap-10 items-center w-full bg-black mb-2'>
        <EditCardImage
          type='vertical'
          isActive={selectType === 'vertical'}
          onSelect={() => handleSelectTypeSize('vertical')}
        />
        <EditCardImage
          type='square'
          isActive={selectType === 'square'}
          onSelect={() => handleSelectTypeSize('square')}
        />
        <EditCardImage
          type='horizon'
          isActive={selectType === 'horizon'}
          onSelect={() => handleSelectTypeSize('horizon')}
        />
      </div>
      <FixedCropper
        src={image}
        onChange={onChange}
        className={'cropper'}
        stencilSize={size}
        stencilProps={{
          handlers: false,
          lines: false,
          movable: true,
          resizable: true,
          grid: true,
        }}
      />
    </Modal>
  );
};

export default memo(CropperImage);
