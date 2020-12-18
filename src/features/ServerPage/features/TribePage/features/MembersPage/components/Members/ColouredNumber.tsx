import React from 'react';

export interface Props {
  num: number;
  bold?: boolean;
}

function ColouredNumber({ num, bold }: Props) {
  return (
    <span
      style={{
        color: num > 0 ? 'green' : num < 0 ? 'red' : undefined,
        fontWeight: bold ? 'bolder' : undefined,
      }}
    >
      {num.toLocaleString()}
    </span>
  );
}

export default ColouredNumber;
