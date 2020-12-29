import React from 'react';
import { Tooltip } from '@material-ui/core';
import { PointTooltipProps } from '@nivo/line';
import { BarTooltipDatum } from '@nivo/bar';

function PointTooltip(props: PointTooltipProps | BarTooltipDatum) {
  const title =
    'point' in props
      ? `X: ${props.point.data.xFormatted}, Y: ${props.point.data.yFormatted}`
      : `${props.indexValue} - ${props.value}`;
  console.log(props);
  return (
    <Tooltip open placement="top" arrow title={title}>
      <div></div>
    </Tooltip>
  );
}

export default PointTooltip;
