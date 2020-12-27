import React from 'react';
import { useQueryParams, StringParam, withDefault } from 'use-query-params';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import { SERVER_PAGE } from '@config/namespaces';

import { Container, Paper } from '@material-ui/core';
import ServerPageLayout from '@features/ServerPage/common/PageLayout/PageLayout';
import ModeSelector from '@common/ModeSelector/ModeSelector';
import LiveEnnoblements from './components/LiveEnnoblements/LiveEnnoblements';
import LatestSavedEnnoblements from './components/LatestSavedEnnoblements/LatestSavedEnnoblements';

function EnnoblementsPage() {
  const [query, setQuery] = useQueryParams({
    mode: withDefault(StringParam, 'live'),
  });
  const { key } = useServer();
  const { t } = useTranslation(SERVER_PAGE.ENNOBLEMENTS_PAGE);
  useTitle(
    t('title_' + (query.mode === 'latest' ? 'latest' : 'live'), { key })
  );

  return (
    <ServerPageLayout>
      <Container>
        <Paper>
          <ModeSelector
            onSelect={m => setQuery({ mode: m.name })}
            modes={[
              {
                name: 'live',
                label: t('modes.live'),
                get selected() {
                  return this.name === query.mode;
                },
              },
              {
                name: 'latest',
                label: t('modes.latest'),
                get selected() {
                  return this.name === query.mode;
                },
              },
            ]}
            style={query.mode === 'latest' ? { paddingBottom: 0 } : {}}
          />
          {query.mode === 'latest' ? (
            <LatestSavedEnnoblements t={t} server={key} />
          ) : (
            <LiveEnnoblements t={t} server={key} />
          )}
        </Paper>
      </Container>
    </ServerPageLayout>
  );
}

export default EnnoblementsPage;
