import { FC } from 'react';

const Title: FC = () => {
  return (
    <h1 className='font-medium text-4xl flex items-center gap-2'>
      Fakescreen{' '}
      <span className='flex justify-center items-center h-20 w-20 rounded-full bg-yellow-400'>
        PRO
      </span>
    </h1>
  );
};

export default Title;
