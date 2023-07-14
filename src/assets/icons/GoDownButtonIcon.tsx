import { FC } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

const GoDownButtonIcon: FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <svg
      width='31'
      height='31'
      viewBox='0 0 31 31'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='15.1797'
        cy='15.1797'
        r='14.805'
        fill={theme === 'dark' ? '#1F2229' : 'white'}
        stroke={theme === 'dark' ? '#3F3F43' : '#B2B2B2'}
        strokeWidth='0.39'
      />
      <path
        d='M21.2639 13.2294L14.712 19.7812L8.16022 13.2294'
        stroke={theme === 'dark' ? 'white' : '#88888D'}
        strokeWidth='1.18464'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default GoDownButtonIcon;
