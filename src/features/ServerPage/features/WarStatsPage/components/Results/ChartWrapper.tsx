import React from 'react';

export interface Props {
  children?: React.ReactNode;
}

function ChartWrapper({ children }: Props) {
  return <div style={{ height: '400px' }}>{children}</div>;
}

export default ChartWrapper;
