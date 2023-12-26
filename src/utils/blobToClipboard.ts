export const blobToClipboard = (blob: Blob) => {
  navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ]);
};
