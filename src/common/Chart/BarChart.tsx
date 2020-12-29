import React from 'react';
import { useTranslation } from 'react-i18next';
import { LINE_CHART } from '@config/namespaces';
import { darkTheme } from './theme';

import { ResponsiveBar, BarSvgProps } from '@nivo/bar';
import { BasicTooltip } from '@nivo/tooltip';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export interface Props extends BarSvgProps {
  loading?: boolean;
}

const BarChart = ({ data, loading, tooltipFormat, ...rest }: Props) => {
  const { t } = useTranslation(LINE_CHART);

  if (loading) {
    return <Skeleton height="100%" variant="rect" />;
  }

  if (data.length === 0) {
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
    <ResponsiveBar
      data={data}
      tooltipFormat={tooltipFormat}
      tooltip={props => {
        return (
          <BasicTooltip
            {...props}
            enableChip
            id={
              typeof props.data[`${props.id}Label`] === 'string'
                ? props.data[`${props.id}Label`]
                : `${props.id} - ${props.indexValue}`
            }
            value={
              typeof tooltipFormat === 'function'
                ? tooltipFormat(props.value)
                : props.value
            }
          />
        );
      }}
      {...rest}
      theme={darkTheme}
    />
  );
};

export default BarChart;
