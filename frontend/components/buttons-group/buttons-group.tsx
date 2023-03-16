import React from 'react';
import b from 'bem-react-helper';

import { ButtonGroup } from '@blueprintjs/core';

interface ButtonsGroupMods {
  vertical: boolean;
}

interface ButtonsGroupProps {
  mods?: ButtonsGroupMods;
  children: React.ReactNode;
}

export const ButtonsGroup = ({ children, mods }: ButtonsGroupProps) => (
  <ButtonGroup className={b('buttons-group', {}, { ...mods })}>
    {children}
  </ButtonGroup>
);
