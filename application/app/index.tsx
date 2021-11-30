import * as React from 'react';

interface Props {
    name: string
}

export default function App({ name }: Props) {
  return (
    <h1>
      {name}!
    </h1>
  );
}
