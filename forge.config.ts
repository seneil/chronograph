import os from 'os';
import path from 'path';

import type { ForgeConfig } from '@electron-forge/shared-types';

import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';
import { author, version } from './package.json';

const getIconPath = (fileName: string) => (
  path.join(__dirname, 'assets/favicons', fileName)
);

const getIconType = (): string => {
  const platform = os.platform();

  switch (platform) {
    case 'darwin':
      return getIconPath('mac/icon.icns');

    case 'win32':
      return getIconPath('win/icon.ico');

    default:
      return getIconPath('png/128x128.png');
  }
};

const config: ForgeConfig = {
  packagerConfig: {
    appCopyright: author.name,
    appVersion: version,
    icon: getIconType(),
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerDeb({})],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      packageSourceMaps: true,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './frontend/chronography.html',
            js: './frontend/views/chronography/index.ts',
            name: 'chronography',
            preload: {
              js: './frontend/preload.ts',
            },
          },
          {
            html: './frontend/append-activity.html',
            js: './frontend/views/append-activity/index.ts',
            name: 'append_activity',
            preload: {
              js: './frontend/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
