import { ReactNode } from 'react';

export interface ISettingWrapper {
  children: ReactNode;
  title: string;
  onClick?: () => void;
  btnTitle?: string;
}
