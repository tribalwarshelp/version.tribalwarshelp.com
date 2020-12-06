import React from 'react';
import { darkTheme } from './theme';

import { ResponsiveLine, LineSvgProps } from '@nivo/line';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PointTooltip from './PointTooltip';

export interface Props extends LineSvgProps {
  loading?: boolean;
}

const LineChart = ({ data, loading, ...rest }: Props) => {
  if (loading) {
    return <Skeleton height="100%" variant="rect" />;
  }

  if (data.filter(({ data }) => data.length > 0).length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        height="100%"
        alignItems="center"
      >
        <Typography variant="h4" align="center">
          No records to display
        </Typography>
      </Box>
    );
  }
  return (
    <ResponsiveLine
      tooltip={PointTooltip}
      data={data}
      {...rest}
      theme={darkTheme}
    />
  );
};

export default LineChart;
