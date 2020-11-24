import React from 'react';
import { Tooltip } from '@material-ui/core';
import { PointTooltipProps } from '@nivo/line';

function PointTooltip(props: PointTooltipProps) {
  return (
    <Tooltip
      open
      placement="top"
      arrow
      title={`X: ${props.point.data.xFormatted}, Y: ${props.point.data.yFormatted}`}
    >
      <div></div>
    </Tooltip>
  );
}

export default PointTooltip;
