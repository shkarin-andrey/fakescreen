import { CropperRef } from 'react-advanced-cropper';

export interface ICropperImage {
  isOpen: boolean;
  image: string;
  onOk: () => void;
  onChange: (cropper: CropperRef) => void;
  onCancel: () => void;
}
