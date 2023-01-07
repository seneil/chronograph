import React from 'react';

interface ChronographyDayProps {
  children: React.ReactNode;
}

export const Chronography__Day = ({ children }: ChronographyDayProps) => (
  <div className="chronography__day">{children}</div>
);
