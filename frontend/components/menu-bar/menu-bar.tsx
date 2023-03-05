import React from 'react';

interface MenuBarProps {
  children: React.ReactNode;
}

export const MenuBar = ({ children }: MenuBarProps) => (
  <div className="menu-bar">{children}</div>
);
