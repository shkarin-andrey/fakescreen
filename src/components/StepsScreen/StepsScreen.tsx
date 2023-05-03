import { Steps } from 'antd';
import { FC, memo } from 'react';

import { IStepsScreen } from './StepsScreen.interface';

const StepsScreen: FC<IStepsScreen> = ({ current, onChange, items }) => {
  return <Steps current={current} onChange={onChange} items={items} className='mt-10' />;
};

export default memo(StepsScreen);
