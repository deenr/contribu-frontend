export type StepKey = 'select' | 'configure' | 'processing' | 'results';

export interface ProgressStep<T> {
  key: T;
  title: string;
  icon: JSX.Element;
}
