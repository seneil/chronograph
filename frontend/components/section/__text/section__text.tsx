import React from 'react';

interface SectionTextProps {
  children: React.ReactNode
}

export const Section__Text = ({ children }: SectionTextProps) => (
  <div className="section__text">{children}</div>
);
