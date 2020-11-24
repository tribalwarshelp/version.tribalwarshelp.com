import React from 'react';
import { darkTheme } from './theme';

import { ResponsiveLine, LineSvgProps } from '@nivo/line';
import PointTooltip from './PointTooltip';

const LineChart = (props: LineSvgProps) => {
  return <ResponsiveLine tooltip={PointTooltip} {...props} theme={darkTheme} />;
};

export default LineChart;
