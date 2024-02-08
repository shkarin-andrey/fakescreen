export enum SelectType {
  'horizon' = 'Вертикальное',
  'square' = 'Квадратное',
  'vertical' = 'Горизонтальное',
}

export type TStencilSize = keyof typeof SelectType;

export interface IEditCardImage {
  type: TStencilSize;
  onSelect: (type: TStencilSize) => void;
  isActive: boolean;
}
