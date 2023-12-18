import { ReactNode } from 'react';

export interface IDnDWrapper {
  children: ReactNode;
  id: string;
  index: number;
  moveCard: (draggedId: string, id: string) => void;
}
