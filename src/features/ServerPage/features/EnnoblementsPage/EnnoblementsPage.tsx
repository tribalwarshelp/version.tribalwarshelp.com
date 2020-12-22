import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import { SERVER_PAGE } from '@config/namespaces';

import { Container, Paper } from '@material-ui/core';
import ServerPageLayout from '@features/ServerPage/common/PageLayout/PageLayout';
import ModeSelector from '@features/ServerPage/common/ModeSelector/ModeSelector';
import LiveEnnoblements from './components/LiveEnnoblements/LiveEnnoblements';
import LatestSavedEnnoblements from './components/LatestSavedEnnoblements/LatestSavedEnnoblements';

import { Mode } from './types';

function EnnoblementsPage() {
  const [mode, setMode] = useState<Mode>('live');
  const { key } = useServer();
  const { t } = useTranslation(SERVER_PAGE.ENNOBLEMENTS_PAGE);
  useTitle(t('title', { key }));

  return (
    <ServerPageLayout>
      <Container>
        <Paper>
          <ModeSelector
            onSelect={m => setMode(m.name as Mode)}
            modes={[
              {
                name: 'live',
                label: t('modes.live'),
                get selected() {
                  return this.name === mode;
                },
              },
              {
                name: 'latest',
                label: t('modes.latest'),
                get selected() {
                  return this.name === mode;
                },
              },
            ]}
          />
          {mode === 'live' ? (
            <LiveEnnoblements t={t} server={key} />
          ) : (
            <LatestSavedEnnoblements t={t} server={key} />
          )}
        </Paper>
      </Container>
    </ServerPageLayout>
  );
}

export default EnnoblementsPage;
