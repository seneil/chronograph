import { app } from 'electron';

import { Chronograph } from './chronograph';

const chronograph = new Chronograph();

async function mountApplication() {
  await chronograph.mountMain();
}

mountApplication()
  .then(() => {
    console.log(`Electron Version ${app.getVersion()}`);
  })
  .catch(console.log);
