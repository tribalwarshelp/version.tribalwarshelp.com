import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import { SERVER_PAGE } from '@config/namespaces';

import { Container, Paper } from '@material-ui/core';
import Content from '@common/Content/Content';
import LatestSavedEnnoblements from './components/LatestSavedEnnoblements/LatestSavedEnnoblements';

function EnnoblementsPage() {
  const { key } = useServer();
  const { t } = useTranslation(SERVER_PAGE.ENNOBLEMENTS_PAGE);
  useTitle(t('title', { key }));

  return (
    <Content component="div" minHeight={false}>
      <Container>
        <Paper>
          <LatestSavedEnnoblements t={t} server={key} />
        </Paper>
      </Container>
    </Content>
  );
}

export default EnnoblementsPage;
