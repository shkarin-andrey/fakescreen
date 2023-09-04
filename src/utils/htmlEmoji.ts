export const htmlEmoji = (src: string, alt: string) => {
  const emoji = `<img class='w-[16px] h-[16px]' src='${src}' alt='${alt}' />`;

  return emoji;
};
