import React from 'react';

import { ButtonGroup } from '@blueprintjs/core';

interface ButtonsGroupProps {
  children: React.ReactNode;
}

export const ButtonsGroup = ({ children }: ButtonsGroupProps) => (
  <ButtonGroup className="buttons-group">
    {children}
  </ButtonGroup>
);
