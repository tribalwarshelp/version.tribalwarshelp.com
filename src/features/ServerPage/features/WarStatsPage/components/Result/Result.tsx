import React from 'react';
import { useTranslation } from 'react-i18next';
import { SERVER_PAGE } from '@config/namespaces';

import { Card, CardContent, Typography } from '@material-ui/core';
import { Result as ResultT } from '../../types';

export interface Props {
  data: ResultT;
}

function Result({ data }: Props) {
  const { t } = useTranslation(SERVER_PAGE.WAR_STATS_PAGE);
  console.log(data);

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" align="center">
          {t('sections.result')}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Result;
