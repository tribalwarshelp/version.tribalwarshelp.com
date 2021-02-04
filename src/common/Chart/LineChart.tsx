import React from 'react';
import { useTranslation } from 'react-i18next';
import { LINE_CHART } from 'config/namespaces';
import { darkTheme } from './theme';

import { ResponsiveLine, LineSvgProps } from '@nivo/line';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export interface Props extends LineSvgProps {
  loading?: boolean;
}

const LineChart = ({ data, loading, yScale, xScale, ...rest }: Props) => {
  const { t } = useTranslation(LINE_CHART);

  if (loading) {
    return <Skeleton height="100%" variant="rect" />;
  }

  if (data.filter(({ data }) => data.length > 1).length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        height="100%"
        alignItems="center"
      >
        <Typography variant="h4" align="center">
          {t('emptyDataSourceMessage')}
        </Typography>
      </Box>
    );
  }
  return (
    <ResponsiveLine
      // tooltip={PointTooltip}
      data={data}
      {...rest}
      xScale={xScale?.type === 'time' ? { useUTC: false, ...xScale } : xScale}
      yScale={yScale?.type === 'time' ? { useUTC: false, ...yScale } : yScale}
      theme={darkTheme}
    />
  );
};

export default LineChart;
