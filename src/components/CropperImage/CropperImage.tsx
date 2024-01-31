import { Modal } from 'antd';
import { FC, memo, useState } from 'react';
import { FixedCropper, StencilSize } from 'react-advanced-cropper';

import EditCardImage from '../EditCardImage';
import { TStencilSize } from '../EditCardImage/EditCardImage.interface';
import { ICropperImage } from './CropperImage.interface';

const CropperImage: FC<ICropperImage> = ({ isOpen, image, onOk, onChange, onCancel }) => {
  const [size, setSize] = useState<StencilSize>({
    width: 300,
    height: 300,
  });

  const handleSelectTypeSize = (type: TStencilSize) => {
    if (type === 'vertical') {
      setSize({
        width: 400,
        height: 716,
      });
    }

    if (type === 'square') {
      setSize({
        width: 604,
        height: 588,
      });
    }

    if (type === 'horizon') {
      setSize({
        width: 609,
        height: 412,
      });
    }
  };

  return (
    <Modal
      title='Редактирование изображения'
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div className='flex justify-around gap-10 items-center w-full bg-black'>
        <EditCardImage
          type='vertical'
          onSelect={() => handleSelectTypeSize('vertical')}
        />
        <EditCardImage type='square' onSelect={() => handleSelectTypeSize('square')} />
        <EditCardImage type='horizon' onSelect={() => handleSelectTypeSize('horizon')} />
      </div>
      <FixedCropper
        src={image}
        onChange={onChange}
        className={'cropper'}
        stencilSize={size}
        stencilProps={{
          handlers: false,
          lines: false,
        }}
      />
    </Modal>
  );
};

export default memo(CropperImage);
