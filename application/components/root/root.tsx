import React from 'react';
import { css } from '@linaria/core';

import Exo2TwoFont from 'assets/fonts/exo-2-v15-latin_cyrillic-500.woff2';
import PTSansFont from 'assets/fonts/PTSans-Regular.ttf';

interface Props {
  children: object;
}

export const globals = css`
  :global() {
    /* exo-2-500 - latin_cyrillic */
    @font-face {
      font-family: 'Exo2';
      font-style: normal;
      font-weight: 500;
      src: url('${Exo2TwoFont}') format('woff2');
    }

    @font-face {
      font-family: 'PT Sans';
      font-style: normal;
      font-weight: 400;
      src: url('${PTSansFont}') format('truetype');
    }

    body {
      position: relative;
      margin: 0;
      background-color: #fff;
    }
  }
`;

const rootStyle = css`
  color: #111;
  font-size: 24px;
`;

export const Root = ({ children }: Props) => (
  <div className={rootStyle}>{children}</div>
);
