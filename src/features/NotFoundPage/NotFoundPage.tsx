import React from 'react';
import { INDEX_PAGE } from '@config/routes';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Link from '@common/Link/Link';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '100vh',
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <main>
      <Container className={classes.container}>
        <Typography gutterBottom variant="h1">
          Page Not Found
        </Typography>
        <Typography gutterBottom variant="h4">
          Looks like you've followed a broken link or entered a URL that doesn't
          exist on this site.
        </Typography>
        <Typography variant="h4">
          <Link color="secondary" to={INDEX_PAGE}>
            Back to our site
          </Link>
        </Typography>
      </Container>
    </main>
  );
};

export default NotFoundPage;
