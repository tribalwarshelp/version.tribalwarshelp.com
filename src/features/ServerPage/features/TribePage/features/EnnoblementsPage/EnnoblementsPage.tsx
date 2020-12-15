import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import useTribe from '../../libs/TribePageContext/useTribe';
import { SERVER_PAGE } from '@config/namespaces';

import { Container } from '@material-ui/core';
import PageLayout from '../../common/PageLayout/PageLayout';
import Ennoblements from './components/Ennoblements/Ennoblements';

function EnnoblementsPage() {
  const { key } = useServer();
  const tribe = useTribe();
  const { t } = useTranslation(SERVER_PAGE.TRIBE_PAGE.ENNOBLEMENTS_PAGE);
  useTitle(t('title', { key, tag: tribe.tag }));
  return (
    <PageLayout>
      <Container>
        <Ennoblements t={t} server={key} tribeID={tribe.id} />
      </Container>
    </PageLayout>
  );
}

export default EnnoblementsPage;
