import { FC } from 'react';

interface IGeoOutlineIcon {
  className?: string;
}

const GeoOutlineIcon: FC<IGeoOutlineIcon> = ({ className = '' }) => {
  return (
    <svg className={className} width='12' height='12' viewBox='0 0 12 12' fill='none'>
      <g clipPath='url(#clip0_128_7637)'>
        <path
          d='M1.37992 4.80735C0.385294 5.25852 0.626261 6.6428 1.69779 6.64793L5.35331 6.65818C5.39945 6.65818 5.39433 6.6428 5.39433 6.69407L5.39945 10.3342C5.40458 11.4211 6.79911 11.6365 7.26054 10.6213L11.0135 2.43357C11.5159 1.34153 10.6853 0.546854 9.5933 1.04417L1.37992 4.80735ZM3.31278 5.37644C3.28715 5.37644 3.28202 5.36106 3.31278 5.34568L9.46 2.54637C9.49589 2.53098 9.52665 2.54124 9.50102 2.58738L6.69657 8.72947C6.68119 8.75511 6.66068 8.74998 6.66068 8.72435L6.68119 6.02757C6.68632 5.55076 6.4915 5.35594 6.01469 5.36106L3.31278 5.37644Z'
          fill='black'
        />
      </g>
      <defs>
        <clipPath id='clip0_128_7637'>
          <rect width='12' height='12' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default GeoOutlineIcon;
