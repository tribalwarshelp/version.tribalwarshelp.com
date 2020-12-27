import React from 'react';
import { TFunction } from 'i18next';

import { Alert } from '@material-ui/lab';
import Link from '@common/Link/Link';

export interface Props {
  t: TFunction;
}

function InfoAfterGenerating({ t }: Props) {
  return (
    <Alert variant="filled" severity="info">
      {t('infoAfterGenerating')}:{' '}
      <Link
        color="primary"
        underline="always"
        to={window.location.pathname + window.location.search}
      >
        URL
      </Link>
    </Alert>
  );
}

export default InfoAfterGenerating;
