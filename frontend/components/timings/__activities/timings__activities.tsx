import React from 'react';

interface TimingsActivitiesProps {
  children: React.ReactNode;
}

export const Timings__Activities = ({ children }: TimingsActivitiesProps) => (
  <div className="timings__activities">{children}</div>
);
