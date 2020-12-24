import React from 'react';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import { SERVER_PAGE } from '@config/routes';
import buildVillageName from '@utils/buildVillageName';
import { buildVillageURL } from '@utils/buildTribalwarsURL';

import { IconButton, Link as MUILink } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import Table from '@common/Table/Table';
import Link from '@common/Link/Link';
import PlayerProfileLink from '@features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';

import { TFunction } from 'i18next';
import { Props as TableFooterProps } from '@common/Table/TableFooter';
import { Ennoblement } from './types';

export interface Props {
  t: TFunction;
  ennoblements: Ennoblement[];
  loading?: boolean;
  hideFooter?: boolean;
  footerProps?: TableFooterProps;
}

function EnnoblementsTable({
  t,
  ennoblements,
  loading,
  hideFooter,
  footerProps,
}: Props) {
  const { version, key: server } = useServer();
  return (
    <Table
      columns={[
        {
          field: 'ennobledAt',
          label: t('table.columns.ennobledAt'),
          type: 'datetime',
          sortable: false,
        },
        {
          field: 'village',
          label: t('table.columns.village'),
          sortable: false,
          valueFormatter: (e: Ennoblement) => {
            return (
              <Link
                to={SERVER_PAGE.VILLAGE_PAGE.INDEX_PAGE}
                params={{ key: server, id: e.village.id }}
              >
                {buildVillageName(e.village.name, e.village.x, e.village.y)}
              </Link>
            );
          },
        },
        {
          field: 'oldOwner',
          label: t('table.columns.oldOwner'),
          sortable: false,
          valueFormatter: (e: Ennoblement) => {
            if (e.oldOwner) {
              return (
                <PlayerProfileLink
                  server={server}
                  player={e.oldOwner}
                  tribe={e.oldOwnerTribe}
                />
              );
            }
            return '-';
          },
        },
        {
          field: 'newOwner',
          label: t('table.columns.newOwner'),
          sortable: false,
          valueFormatter: (e: Ennoblement) => {
            return (
              <PlayerProfileLink
                server={server}
                player={e.newOwner}
                tribe={e.newOwnerTribe}
              />
            );
          },
        },
      ]}
      loading={loading}
      data={ennoblements}
      size="small"
      hideFooter={hideFooter}
      footerProps={footerProps}
      actions={[
        {
          icon: (e: Ennoblement) => (
            <MUILink href={buildVillageURL(version.host, server, e.village.id)}>
              <IconButton>
                <Visibility />
              </IconButton>
            </MUILink>
          ),
          tooltip: t('table.actions.inGameProfile'),
        },
      ]}
    />
  );
}

export default EnnoblementsTable;
