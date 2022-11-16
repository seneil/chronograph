import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

interface ApplicationProps {
  title: string;
  children?: React.ReactNode;
}

const Chronograph: React.FC<ApplicationProps> = ({ title }) => (
  <h2>{title}</h2>
);

root.render(<Chronograph title="Hello from React 18"/>);
