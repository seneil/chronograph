import * as React from 'react';

interface ActivityProps {
  children: React.ReactNode;
}

export const Activity = ({ children }: ActivityProps) => (
  <div className='activity'>{children}</div>
);
