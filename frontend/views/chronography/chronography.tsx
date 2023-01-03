import React from 'react';
import { createRoot } from 'react-dom/client';
import { FocusStyleManager, Card, FormGroup, Button } from '@blueprintjs/core';

import { openActivityAppendWindow } from '@frontend/controller';

import { Chronography } from '@frontend/components/chronography';

const container = document.getElementById('root');
const root = createRoot(container);

interface ChronographyViewProps {
  title: string;
  children?: React.ReactNode;
}

FocusStyleManager.onlyShowFocusOnTabs();

const ChronographyView = ({ title }: ChronographyViewProps) => {
  const createActivityAppendWindow = () => {
    openActivityAppendWindow();
  };

  return (
    <Card>
      <h2>{title}</h2>

      <FormGroup>
        <Button
          large={true}
          icon='plus'
          onClick={createActivityAppendWindow}
        >Append activity</Button>
      </FormGroup>

      <Chronography/>
    </Card>
  );
};

root.render(<ChronographyView title='Hello from React 18'/>);
