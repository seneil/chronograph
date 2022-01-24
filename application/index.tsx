import React from 'react';
import ReactDOM from 'react-dom';

import { Root } from 'components/root';
import { Frame } from 'components/frame';

export interface ElectronAPI {
  getVersion: () => string,
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

const mountNode = document.getElementById('root');

const RootComponent = (
  <Root>
    <Frame title="Chronograph">
      <div>
        {window.electronAPI?.getVersion()}
      </div>
    </Frame>
  </Root>
);

ReactDOM.render(RootComponent, mountNode);
