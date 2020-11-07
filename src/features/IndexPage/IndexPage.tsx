import React from 'react';
import useTitle from '@libs/useTitle';
import useStyles from './styles';
import { INDEX_PAGE } from '@config/namespaces';

import { Container, Toolbar } from '@material-ui/core';
import Header from './components/Header/Header';
import ServerSelection from './components/ServerSelection/ServerSelection';
import Footer from './components/Footer/Footer';
import { useTranslation } from 'react-i18next';

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
          <ServerSelection />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
