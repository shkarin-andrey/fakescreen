import { FC } from 'react';

import { Message } from '../../redux/state/chatSlice';

interface ITailIcon {
  type: Message['type'];
}

const TailIcon: FC<ITailIcon> = ({ type }) => {
  return (
    <svg width='14' height='8' viewBox='0 0 14 8' fill='none'>
      <path
        d='M1.3291 4.5L3.8578 6.89664L9.8291 1M12.8291 1L6.95676 6.87234L6.8291 7'
        stroke={type === 'owner' ? '#007AFF' : 'white'}
        strokeWidth='0.945076'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default TailIcon;
