import React from 'react';
import b from 'bem-react-helper';

interface ActivityProps {
  children: React.ReactNode;
  isTotal?: boolean;
}

export const Activity = ({ children, isTotal }: ActivityProps) => (
  <div className={b('activity', {}, { total: isTotal })}>{children}</div>
);
