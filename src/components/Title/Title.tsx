import { FC, memo } from 'react';

const Title: FC = () => {
  return (
    <h1 className='font-medium text-2xl flex items-center justify-center gap-2'>
      Fakescreen{' '}
      <span className='flex justify-center items-center h-14 w-14 rounded-full bg-yellow-400'>
        PRO
      </span>
    </h1>
  );
};

export default memo(Title);
