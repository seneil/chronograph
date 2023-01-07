import React from 'react';
import { createRoot } from 'react-dom/client';
import { FocusStyleManager, Card, FormGroup, InputGroup } from '@blueprintjs/core';

const container = document.getElementById('root');
const root = createRoot(container);

interface AppendActivityProps {
  title: string;
  children?: React.ReactNode;
}

FocusStyleManager.onlyShowFocusOnTabs();

const AppendActivityView = ({ title }: AppendActivityProps) => {
  return (
    <Card>
      <h2>{title}</h2>

      <FormGroup>
        <InputGroup large={true} autoFocus={true}/>
      </FormGroup>
    </Card>
  );
}

root.render(<AppendActivityView title='Append activity'/>);
