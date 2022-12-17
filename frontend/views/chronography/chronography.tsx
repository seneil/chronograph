import React from 'react';
import { createRoot } from 'react-dom/client';

import { FocusStyleManager, Card, FormGroup, Button } from '@blueprintjs/core';

import { API_ENTRY } from '../../constants';

const container = document.getElementById('root');
const root = createRoot(container);

interface ChronographyViewProps {
  title: string;
  children?: React.ReactNode;
}

FocusStyleManager.onlyShowFocusOnTabs();

class ChronographyView extends React.Component<ChronographyViewProps> {
  createActivityAppendWindow = () => {
    window[API_ENTRY].createActivityAppendWindow();
  };

  render() {
    return (
      <Card>
        <h2>{this.props.title}</h2>

        <FormGroup>
          <Button
            large={true}
            icon='plus'
            onClick={this.createActivityAppendWindow}
          >Append activity</Button>
        </FormGroup>
      </Card>
    );
  }
}

root.render(<ChronographyView title='Hello from React 18'/>);
