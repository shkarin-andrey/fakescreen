import { TTheme } from '../redux/state/themeState';

export const getColorfromPercent = (
  size: number,
  isEconom: boolean,
  isCharge: boolean,
  theme: TTheme,
): string => {
  if (isEconom) {
    return '#FFCC0A';
  }

  if (size > 20 && isCharge) {
    return '#34C759';
  }

  if (theme === 'dark' && size > 20) {
    return 'white';
  }

  if (size > 20) {
    return 'black';
  }

  return '#FF3B30';
};
