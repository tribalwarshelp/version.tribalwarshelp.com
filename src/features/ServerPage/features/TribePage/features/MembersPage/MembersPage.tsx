import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from 'libs/useTitle';
import useServer from 'features/ServerPage/libs/ServerContext/useServer';
import useTribe from '../../libs/TribePageContext/useTribe';
import { SERVER_PAGE } from 'config/namespaces';

import { Container } from '@material-ui/core';
import Members from './components/Members/Members';

function MembersPage() {
  const { key } = useServer();
  const tribe = useTribe();
  const { t } = useTranslation(SERVER_PAGE.TRIBE_PAGE.MEMBERS_PAGE);
  useTitle(t('title', { key, tag: tribe.tag }));
  return (
    <Container>
      <Members t={t} server={key} tribeID={tribe.id} />
    </Container>
  );
}

export default MembersPage;
