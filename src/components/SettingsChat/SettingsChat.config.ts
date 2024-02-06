import { getImageUrl } from '../../utils/getImageUrl';

export const listImages = () => {
  const images = [];

  for (let index = 1; index <= 41; index++) {
    images.push(getImageUrl(`emoji${index}`));
  }

  return images;
};
