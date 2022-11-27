import React from 'react';
import { createRoot } from 'react-dom/client';

import { FocusStyleManager, Button } from "@blueprintjs/core";

import { API_ENTRY } from './constants';

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
      text="Versions"
      onClick={() => {
        console.log(
          window[API_ENTRY].getVersion(),
        )
      }}
    />
  </>
);

root.render(<Chronograph title="Hello from React 18"/>);
