import React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  BoxProps,
  TypographyProps,
} from '@material-ui/core';

export interface Props {
  size?: number;
  containerProps?: BoxProps;
  typographyProps?: TypographyProps;
  description?: string;
}

function Spinner({
  size,
  containerProps,
  typographyProps,
  description,
}: Props) {
  return (
    <Box {...containerProps}>
      <Box mb={description ? 1 : 0}>
        <CircularProgress size={size} />
      </Box>
      {description && (
        <Typography {...typographyProps}>{description}</Typography>
      )}
    </Box>
  );
}

Spinner.defaultProps = {
  size: 200,
  containerProps: {} as BoxProps,
  typographyProps: {
    variant: 'h3',
  } as TypographyProps,
  description: '',
} as Props;

export default Spinner;
