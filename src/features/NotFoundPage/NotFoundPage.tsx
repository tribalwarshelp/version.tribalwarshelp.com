import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import { INDEX_PAGE } from '@config/routes';
import { NOT_FOUND_PAGE } from '@config/namespaces';

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
  const { t } = useTranslation(NOT_FOUND_PAGE);
  useTitle(t('title'));

  return (
    <main>
      <Container className={classes.container}>
        <Typography gutterBottom variant="h1">
          {t('title')}
        </Typography>
        <Typography gutterBottom variant="h4">
          {t('description')}
        </Typography>
        <Typography variant="h4">
          <Link to={INDEX_PAGE}>{t('backToOurSite')}</Link>
        </Typography>
      </Container>
    </main>
  );
};

export default NotFoundPage;
