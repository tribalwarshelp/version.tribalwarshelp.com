import React from 'react';
import formatNumber from '@utils/formatNumber';

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
      {formatNumber('commas', num)}
    </span>
  );
}

export default ColouredNumber;
