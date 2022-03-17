import React from 'react';
import { styled } from '@linaria/react';

interface Props {
  title?: string;
  children: object;
}

const TitleBar = styled.div`
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
  line-height: 27px;
  font-size: 12px;
  padding: 0 68px;
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 400;
  position: absolute;
  background-color: brown;
  -webkit-app-region: drag;
`;

const Main = styled.div`
  padding-top: 25px;
  font-size: 18px;
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 400;
  text-align: center;
`;

export const Frame = ({ children, title }: Props) => (
  <>
    <TitleBar>{title}</TitleBar>
    <Main>{children}</Main>
  </>
);
