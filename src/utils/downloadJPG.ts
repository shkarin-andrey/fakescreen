export const downloadJPG = (canvas: HTMLCanvasElement) => {
  const link = document.createElement('a');
  link.download = 'screenshot.jpg';
  link.href = canvas.toDataURL('image/jpeg', 1);
  link.click();
};
