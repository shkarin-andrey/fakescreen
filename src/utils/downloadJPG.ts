export const downloadJPG = (dataUrl: string) => {
  const link = document.createElement('a');
  link.download = 'screenshot.jpg';
  link.href = dataUrl;
  link.click();
};
