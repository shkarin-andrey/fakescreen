export const download = (name: string, dataUrl: string) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = dataUrl;
  link.click();
};
