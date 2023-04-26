export const blobToClipboard = (blob: Blob | null) => {
  if (blob) {
    navigator.clipboard.write([
      new ClipboardItem(
        Object.defineProperty({}, blob.type, {
          value: blob,
          enumerable: true,
        }),
      ),
    ]);
  }
};
