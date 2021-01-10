import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
import Table from '@common/Table/Table';
import { NameChange } from '../../../../libs/PlayerPageContext/types';

import { TFunction } from 'i18next';

export interface Props {
  t: TFunction;
  nameChanges: NameChange[];
}

function NameChanges({ t, nameChanges }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{t('nameChanges.title')}</Typography>
      </CardContent>
      <Table
        columns={[
          {
            field: 'changeDate',
            label: t('nameChanges.columns.changeDate'),
            type: 'dateutc',
          },
          {
            field: 'newName',
            label: t('nameChanges.columns.newName'),
          },
          {
            field: 'oldName',
            label: t('nameChanges.columns.oldName'),
          },
        ]}
        data={nameChanges}
        size="small"
        hideFooter
        footerProps={{
          rowsPerPage: nameChanges.length,
          rowsPerPageOptions: [nameChanges.length],
        }}
      />
    </Card>
  );
}

export default NameChanges;
