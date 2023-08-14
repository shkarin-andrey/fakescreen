import { ButtonType } from 'antd/es/button';
import { ReactElement } from 'react';

export interface IPreviewScreenshot {
  title: string;
  type?: ButtonType;
  img?: string | ReactElement;
  exportFile?: boolean;
}
