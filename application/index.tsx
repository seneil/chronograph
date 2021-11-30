import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Application from './app';

const mountNode = document.getElementById('root');

ReactDOM.render(<Application name="Chronograph Electron Application"/>, mountNode);
