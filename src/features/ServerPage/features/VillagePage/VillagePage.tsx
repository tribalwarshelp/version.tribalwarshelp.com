import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import useVillage from './useVillage';
import { SERVER_PAGE } from '@config/namespaces';

import { Container } from '@material-ui/core';
import NotFoundPage from '@features/ServerPage/features/NotFoundPage/NotFoundPage';
import ServerPageLayout from '@features/ServerPage/common/PageLayout/PageLayout';
import Spinner from '@common/Spinner/Spinner';
import PageLayout from './components/PageLayout/PageLayout';
import Ennoblements from './components/Ennoblements/Ennoblements';

function VillagePage() {
  const { t } = useTranslation(SERVER_PAGE.VILLAGE_PAGE.INDEX_PAGE);
  const { key } = useServer();
  const { village, loading } = useVillage();
  useTitle(t('title', { name: village?.fullName ?? '', key }), {
    skip: !village,
  });

  if (loading) {
    return (
      <ServerPageLayout>
        <Spinner
          containerProps={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </ServerPageLayout>
    );
  }

  if (!village) {
    return <NotFoundPage title={t('villageNotFound')} />;
  }

  return (
    <PageLayout t={t} server={key} village={village}>
      <Container>
        <Ennoblements t={t} server={key} villageID={village.id} />
      </Container>
    </PageLayout>
  );
}

export default VillagePage;
