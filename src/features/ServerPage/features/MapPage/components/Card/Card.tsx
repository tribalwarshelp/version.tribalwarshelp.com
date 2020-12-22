import React from 'react';

import { Grid, Card as MUICard, CardContent } from '@material-ui/core';

export interface Props {
  children?: React.ReactNode;
}

const Card = ({ children }: Props) => {
  return (
    <Grid item xs={12} md={4}>
      <MUICard>
        <CardContent>{children}</CardContent>
      </MUICard>
    </Grid>
  );
};

export default Card;
