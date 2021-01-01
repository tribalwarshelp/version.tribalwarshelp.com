import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import { INDEX_PAGE } from '@config/namespaces';

import { Container, Box } from '@material-ui/core';
import DevNote from '@common/DevNote/DevNote';
import ServerSelection from './components/ServerSelection/ServerSelection';

export default function IndexPage() {
  const { t } = useTranslation(INDEX_PAGE);
  useTitle(t('title'));
  return (
    <Container>
      <Box mb={3}>
        <DevNote />
      </Box>
      <ServerSelection />
    </Container>
  );
}
