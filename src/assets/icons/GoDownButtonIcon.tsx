import { FC } from 'react';

const GoDownButtonIcon: FC = () => {
  return (
    <svg width='48' height='49' viewBox='0 0 48 49' fill='none'>
      <g filter='url(#filter0_d_464_8637)'>
        <g filter='url(#filter1_ddd_464_8637)'>
          <circle cx='24' cy='23' r='16' fill='white' />
        </g>
        <path
          d='M31 21.3994L24 28.3994L17 21.3994'
          stroke='#868686'
          strokeWidth='1.3125'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_464_8637'
          x='4.83333'
          y='3.83333'
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
            result='effect1_dropShadow_464_8637'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_464_8637'
            result='shape'
          />
        </filter>
        <filter
          id='filter1_ddd_464_8637'
          x='0'
          y='0.6'
          width='48'
          height='48'
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
          <feOffset dy='1.6' />
          <feGaussianBlur stdDeviation='4' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_464_8637'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='0.8' />
          <feGaussianBlur stdDeviation='0.4' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_464_8637'
            result='effect2_dropShadow_464_8637'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='0.4' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
          />
          <feBlend
            mode='normal'
            in2='effect2_dropShadow_464_8637'
            result='effect3_dropShadow_464_8637'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect3_dropShadow_464_8637'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

export default GoDownButtonIcon;
