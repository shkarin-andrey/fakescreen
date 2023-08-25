import { MAX_AUDIO_LINE, MIN_AUDIO_LINE } from '../config';
import { formatedCount } from './formatedCount';

export const generateAudioList = (duration: number) => {
  const count = formatedCount(duration);
  if (!count) return;

  const newArr: number[] = [];

  for (let index = 0; index < count; index++) {
    const lineHeight = Math.floor(Math.random() * MAX_AUDIO_LINE) + MIN_AUDIO_LINE;

    newArr.push(lineHeight);
  }

  return newArr;
};
