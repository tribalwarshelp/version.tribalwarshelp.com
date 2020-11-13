import React from 'react';
import useServer from '../../libs/ServerContext/useServer';

import { Container } from '@material-ui/core';
import PageLayout from '@features/ServerPage/common/PageLayout/PageLayout';
import RecentlyDeletedPlayers from './components/RecentlyDeletedPlayers/RecentlyDeletedPlayers';

function IndexPage() {
  const { key } = useServer();
  return (
    <PageLayout>
      <Container>
        <RecentlyDeletedPlayers server={key} />
      </Container>
    </PageLayout>
  );
}

export default IndexPage;
