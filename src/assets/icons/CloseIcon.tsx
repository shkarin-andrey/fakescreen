import { FC } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';

const CloseIcon: FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
      <path
        d='M13.3201 7.80896L10.7757 10.3533M10.7757 10.3533L8.23133 12.8977M10.7757 10.3533L8.23133 7.80896M10.7757 10.3533L13.3201 12.8977M18.4088 10.3533C18.4088 14.569 14.9914 17.9865 10.7757 17.9865C6.56004 17.9865 3.14258 14.569 3.14258 10.3533C3.14258 6.13768 6.56004 2.72021 10.7757 2.72021C14.9914 2.72021 18.4088 6.13768 18.4088 10.3533Z'
        stroke={theme === 'dark' ? 'white' : '#8C8C8C'}
        strokeWidth='1.14497'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default CloseIcon;
