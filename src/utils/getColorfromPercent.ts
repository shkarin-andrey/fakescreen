export const getColorfromPercent = (
  size: number,
  isEconom: boolean,
  isCharge: boolean,
): string => {
  if (isEconom) {
    return '#FFCC0A';
  }

  if (size > 50 && isCharge) {
    return '#34C759';
  }

  if (size > 50) {
    return 'black';
  }

  if (size <= 50 && size > 20) {
    return '#FFCC0A';
  }

  return '#FF3B30';
};
