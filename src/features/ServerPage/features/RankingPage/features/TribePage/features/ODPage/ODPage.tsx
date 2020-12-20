import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import { SERVER_PAGE } from '@config/namespaces';

import { Container } from '@material-ui/core';
import PageLayout from '@features/ServerPage/features/RankingPage/common/PageLayout/PageLayout';
import Ranking from './components/Ranking/Ranking';

function ODPage() {
  const { key } = useServer();
  const { t } = useTranslation(SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.OD_PAGE);
  useTitle(t('title', { key }));
  return (
    <PageLayout>
      <Container>
        <Ranking t={t} server={key} />
      </Container>
    </PageLayout>
  );
}

export default ODPage;
