import { ButtonType } from 'antd/es/button';

export interface IPreviewScreenshot {
  title: string;
  type?: ButtonType;
  img?: string;
  exportFile?: boolean;
}
