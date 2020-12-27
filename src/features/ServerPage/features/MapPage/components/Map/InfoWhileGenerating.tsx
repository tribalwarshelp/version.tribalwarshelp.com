import React from 'react';
import { TFunction } from 'i18next';

import { Alert } from '@material-ui/lab';

export interface Props {
  t: TFunction;
}

function InfoAfterGenerating({ t }: Props) {
  return (
    <Alert variant="filled" severity="info">
      {t('infoWhileGenerating')}
    </Alert>
  );
}

export default InfoAfterGenerating;
