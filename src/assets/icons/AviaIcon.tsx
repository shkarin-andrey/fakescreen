import { FC } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

interface IAviaIcon {
  width?: string;
  height?: string;
  isSettings?: boolean;
  className?: string;
}

const AviaIcon: FC<IAviaIcon> = ({
  width = '20',
  height = '14',
  isSettings = false,
  className = '',
}) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 14'
      fill='none'
      className={className}
    >
      <path
        d='M18.6366 7.00341C18.6366 6.19873 17.5387 5.57136 16.1953 5.57136H13.3926C13.0107 5.57136 12.8743 5.49635 12.6425 5.25085L8.019 0.245494C7.86897 0.0886508 7.69167 0 7.49391 0H6.62104C6.44374 0 6.34145 0.163663 6.4301 0.347784L8.81685 5.56454L5.32538 5.95324L4.07745 3.72333C3.98198 3.55285 3.83195 3.47784 3.61374 3.47784H3.30687C3.12275 3.47784 3 3.60058 3 3.78471V10.2221C3 10.4062 3.12275 10.529 3.30687 10.529H3.61374C3.83195 10.529 3.98198 10.454 4.07745 10.2835L5.32538 8.04676L8.81685 8.44228L6.4301 13.6522C6.34145 13.8432 6.44374 14 6.62104 14H7.49391C7.69167 14 7.86897 13.9182 8.019 13.7613L12.6425 8.75597C12.8743 8.50365 13.0107 8.43546 13.3926 8.43546H16.1953C17.5387 8.43546 18.6366 7.80127 18.6366 7.00341Z'
        fill={theme === 'dark' && !isSettings ? 'white' : 'black'}
      />
    </svg>
  );
};

export default AviaIcon;
