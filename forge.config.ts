import type { ForgeConfig } from '@electron-forge/shared-types';

import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerDeb({})],
  plugins: [
    new WebpackPlugin({
      mainConfig,
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
