import React from 'react';

interface Props {
  name: string,
  version: string,
}

export default function App({ name, version }: Props) {
  return (
    <>
      <h1>{name}</h1>
      <h3>{version}</h3>
    </>
  );
}
