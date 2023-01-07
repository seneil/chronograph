import React from 'react';

interface SectionRowProps {
  children: React.ReactNode;
}

export const Section__Row = ({ children }: SectionRowProps) => (
  <div className="section__row">{children}</div>
);
