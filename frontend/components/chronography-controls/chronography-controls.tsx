import React from 'react';

interface ChronographyControlsProps {
  children: React.ReactNode;
}

export const ChronographyControls = ({ children }: ChronographyControlsProps) => (
  <div className="chronography-controls">{children}</div>
);
