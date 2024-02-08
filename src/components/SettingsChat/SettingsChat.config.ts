import { getImageUrl } from '../../utils/getImageUrl';

const EMOJI_LENGTH = 44;

export const listImages = () => {
  const images = [];

  for (let index = 1; index <= EMOJI_LENGTH; index++) {
    images.push(getImageUrl(`emoji${index}`));
  }

  return images;
};
