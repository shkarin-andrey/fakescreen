import { StepProps } from 'antd/es/steps';

export interface IStepsScreen {
  current: number;
  onChange: (current: number) => void;
  items: StepProps[];
}
