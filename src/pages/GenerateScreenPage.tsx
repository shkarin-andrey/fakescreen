import { FC } from 'react';

import Layout from '../components/Layout';
import { menuList } from '../components/Navigate/Navigate.config';
import { useAppSelector } from '../hooks/useAppSelector';

const GenerateScreenPage: FC = () => {
  const step = useAppSelector((state) => state.menu.step);

  return (
    <Layout>
      <div className='flex flex-col gap-6 mt-5'>
        <h2>{menuList[step].title}</h2>
        <div>{menuList[step].content}</div>
      </div>
    </Layout>
  );
};

export default GenerateScreenPage;
