import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import { SERVER_PAGE } from '@config/namespaces';

import { Container } from '@material-ui/core';
import Ranking from './components/Ranking/Ranking';

function IndexPage() {
  const { key } = useServer();
  const { t } = useTranslation(SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.INDEX_PAGE);
  useTitle(t('title', { key }));
  return (
    <Container>
      <Ranking t={t} server={key} />
    </Container>
  );
}

export default IndexPage;
