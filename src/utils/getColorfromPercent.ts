export const getColorfromPercent = (size: number): string => {
  if (size > 50) {
    return 'black';
  }

  if (size <= 50 && size > 20) {
    return '#FFCC0A';
  }

  return '#FF3B30';
};
