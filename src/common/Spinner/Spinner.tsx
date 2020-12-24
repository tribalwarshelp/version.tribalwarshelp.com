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
  size = 150,
  containerProps = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  typographyProps = { variant: 'h3' },
  description = '',
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

export default Spinner;
