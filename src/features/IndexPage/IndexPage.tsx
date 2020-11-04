import React from 'react';
import useStyles from './styles';

import { Container, Toolbar } from '@material-ui/core';

import Header from './components/Header/Header';
import ServerSelection from './components/ServerSelection/ServerSelection';
import Footer from './components/Footer/Footer';

export default function IndexPage() {
  const classes = useStyles();

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
