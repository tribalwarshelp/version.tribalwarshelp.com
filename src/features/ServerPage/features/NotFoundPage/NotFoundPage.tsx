import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import PageLayout from '@features/ServerPage/common/PageLayout/PageLayout';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
  },
}));

export interface Props {
  title?: string;
  description?: string;
}

function NotFoundPage({ title, description }: Props) {
  const classes = useStyles();
  return (
    <PageLayout>
      <div className={classes.container}>
        <Typography gutterBottom variant="h1">
          {title ? title : 'Page not found'}
        </Typography>
        {description && (
          <Typography gutterBottom variant="h4">
            {description}
          </Typography>
        )}
      </div>
    </PageLayout>
  );
}

export default NotFoundPage;
