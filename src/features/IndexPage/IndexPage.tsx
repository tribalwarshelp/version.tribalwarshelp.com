import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useStyles from './styles';
import { INDEX_PAGE } from '@config/namespaces';

import { Container, Toolbar, Box } from '@material-ui/core';
import Header from './components/Header/Header';
import ServerSelection from './components/ServerSelection/ServerSelection';
import Footer from './components/Footer/Footer';
import DevNote from '@common/DevNote/DevNote';

export default function IndexPage() {
  const classes = useStyles();
  const { t } = useTranslation(INDEX_PAGE);
  useTitle(t('title'));
  return (
    <div>
      <Header />
      <Toolbar />
      <main className={classes.main}>
        <Container>
          <Box mb={3}>
            <DevNote />
          </Box>
          <ServerSelection />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
