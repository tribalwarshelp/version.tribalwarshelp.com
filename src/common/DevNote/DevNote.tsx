import React from 'react';
import { useTranslation } from 'react-i18next';
import { COMMON } from 'config/namespaces';

import { TypographyProps, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function DevNote(props: Omit<TypographyProps, 'children'>) {
  const { t } = useTranslation(COMMON);
  return (
    <Alert severity="info" variant="filled">
      <Typography {...props}>{t('devNote')}</Typography>
    </Alert>
  );
}

export default DevNote;
