import { FC } from 'react';

const GoDownButtonIcon: FC = () => {
  return (
    <svg width='40' height='40' viewBox='0 0 40 40' fill='none'>
      <g filter='url(#filter0_d_466_8645)'>
        <circle cx='20' cy='20' r='16' fill='white' />
        <path
          d='M27 18.3994L20 25.3994L13 18.3994'
          stroke='#868686'
          strokeWidth='1.3125'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_466_8645'
          x='0.833333'
          y='0.833333'
          width='38.3333'
          height='38.3333'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='1.58333' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_466_8645'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_466_8645'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

export default GoDownButtonIcon;
