import { NonIdealState, NonIdealStateIconSize } from '@blueprintjs/core';

interface TimingEmptyProps {
  children: string;
}

export const TimingEmpty = ({ children }: TimingEmptyProps) => (
  <NonIdealState
    icon="search"
    iconSize={NonIdealStateIconSize.EXTRA_SMALL}
    layout="horizontal"
    className="timing-empty"
    title={children}
  />
);
