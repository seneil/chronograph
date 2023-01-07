import React from 'react';

interface SectionProps {
  children: React.ReactNode;
}

export const Section = ({ children }: SectionProps) => (
  <div className="section">{children}</div>
);
