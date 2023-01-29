import React, { useMemo } from 'react';

import { Card, useHotkeys } from '@blueprintjs/core';

interface WindowCardProps {
  children: React.ReactNode;
  onPressESC: () => void;
}

export const WindowCard = ({ children, onPressESC }: WindowCardProps) => {
  const hotkeys = useMemo(() => [{
    combo: 'esc',
    global: true,
    label: 'Close Window',
    onKeyDown: onPressESC,
  }], [onPressESC]);

  const { handleKeyDown } = useHotkeys(hotkeys);

  return (
    <Card onKeyDown={handleKeyDown}>
      {children}
    </Card>
  );
};
