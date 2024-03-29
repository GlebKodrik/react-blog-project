import { ReactNode } from 'react';

export type TProps = {
  children: ReactNode,
  callbackScrollEnd: () => void,
  scrollableTarget?: string
};
