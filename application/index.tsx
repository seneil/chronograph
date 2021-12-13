import React from 'react';
import ReactDOM from 'react-dom';

import Application from './components/application';

export interface ElectronAPI {
  getVersion: () => string,
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

const mountNode = document.getElementById('root');

ReactDOM.render(<Application
  name="Chronograph Electron Application"
  version={window.electronAPI.getVersion()}
/>, mountNode);
