export const getColorfromPercent = (
  size: number,
  isEconom: boolean,
  isCharge: boolean,
): string => {
  if (isEconom) {
    return '#FFCC0A';
  }

  if (size > 20 && isCharge) {
    return '#34C759';
  }

  if (size > 20) {
    return 'black';
  }

  return '#FF3B30';
};
