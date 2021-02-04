import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from 'libs/useTitle';
import useServer from 'features/ServerPage/libs/ServerContext/useServer';
import usePlayer from '../../libs/PlayerPageContext/usePlayer';
import { SERVER_PAGE } from 'config/namespaces';

import { Container } from '@material-ui/core';
import PlayerHistory from './components/PlayerHistory/PlayerHistory';

function HistoryPage() {
  const { key } = useServer();
  const player = usePlayer();
  const { t } = useTranslation(SERVER_PAGE.PLAYER_PAGE.HISTORY_PAGE);
  useTitle(t('title', { key, name: player.name }));
  return (
    <Container>
      <PlayerHistory t={t} server={key} playerID={player.id} />
    </Container>
  );
}

export default HistoryPage;
