import React from 'react';
import { createRoot } from 'react-dom/client';

import { FocusStyleManager, Button } from "@blueprintjs/core";

const container = document.getElementById('root');
const root = createRoot(container);

interface ApplicationProps {
  title: string;
  children?: React.ReactNode;
}

FocusStyleManager.onlyShowFocusOnTabs();

const Chronograph: React.FC<ApplicationProps> = ({ title }) => (
  <>
    <h2>{title}</h2>
    <Button
      icon="refresh"
      text="Sample button"
      onClick={event => {
        console.log(event)
      }}
    />
  </>
);

root.render(<Chronograph title="Hello from React 18"/>);
