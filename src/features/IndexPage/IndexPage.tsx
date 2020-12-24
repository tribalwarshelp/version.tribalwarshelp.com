import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import { INDEX_PAGE } from '@config/namespaces';

import { Container, Toolbar, Box } from '@material-ui/core';
import DevNote from '@common/DevNote/DevNote';
import Content from '@common/Content/Content';
import Header from './components/Header/Header';
import ServerSelection from './components/ServerSelection/ServerSelection';
import Footer from './components/Footer/Footer';

export default function IndexPage() {
  const { t } = useTranslation(INDEX_PAGE);
  useTitle(t('title'));
  return (
    <div>
      <Header />
      <Toolbar />
      <Content footer>
        <Container>
          <Box mb={3}>
            <DevNote />
          </Box>
          <ServerSelection />
        </Container>
      </Content>
      <Footer />
    </div>
  );
}
