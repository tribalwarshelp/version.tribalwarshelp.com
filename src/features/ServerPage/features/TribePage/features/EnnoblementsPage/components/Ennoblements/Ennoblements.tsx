import React from 'react';
import { useQuery } from '@apollo/client';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import useScrollToElement from '@libs/useScrollToElement';
import { validateRowsPerPage } from '@common/Table/helpers';
import { SERVER_PAGE } from '@config/routes';
import { ENNOBLEMENTS } from './queries';
import { LIMIT } from './constants';
import buildVillageName from '@utils/buildVillageName';

import { Paper } from '@material-ui/core';
import Table from '@common/Table/Table';
import Link from '@common/Link/Link';
import PlayerProfileLink from '@features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';
import Dot from '@features/ServerPage/common/Dot/Dot';

import { TFunction } from 'i18next';
import { EnnoblementsQueryVariables } from '@libs/graphql/types';
import { Ennoblements as EnnoblementsT, Ennoblement } from './types';

export interface Props {
  server: string;
  tribeID: number;
  t: TFunction;
}

function Ennoblements({ t, server, tribeID }: Props) {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, LIMIT),
  });
  const limit = validateRowsPerPage(query.limit);
  useScrollToElement(document.documentElement, [query.page, limit]);
  const { data: queryData, loading: queryLoading } = useQuery<
    EnnoblementsT,
    EnnoblementsQueryVariables
  >(ENNOBLEMENTS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit,
      offset: query.page * limit,
      sort: ['ennobledAt DESC'],
      filter: {
        or: {
          newOwnerTribeID: [tribeID],
          oldOwnerTribeID: [tribeID],
        },
      },
      server,
    },
  });
  const ennoblements = queryData?.ennoblements?.items ?? [];
  const loading = ennoblements.length === 0 && queryLoading;
  const total = queryData?.ennoblements?.total ?? 0;

  return (
    <Paper>
      <Table
        columns={[
          {
            field: 'type',
            label: '',
            sortable: false,
            valueFormatter: (e: Ennoblement) => {
              if (
                e.newOwnerTribe &&
                e.newOwnerTribe.id === tribeID &&
                e.oldOwnerTribe &&
                e.oldOwnerTribe.id === tribeID
              ) {
                return <Dot backgroundColor="yellow" />;
              } else if (e.oldOwnerTribe && e.oldOwnerTribe.id === tribeID) {
                return <Dot backgroundColor="red" />;
              }
              return <Dot backgroundColor="green" />;
            },
          },
          {
            field: 'ennobledAt',
            label: t('ennoblements.columns.ennobledAt'),
            sortable: false,
            type: 'datetime',
          },
          {
            field: 'village',
            label: t('ennoblements.columns.village'),
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
            label: t('ennoblements.columns.oldOwner'),
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
            label: t('ennoblements.columns.newOwner'),
            sortable: false,
            valueFormatter: (e: Ennoblement) => {
              if (e.newOwner) {
                return (
                  <PlayerProfileLink
                    server={server}
                    player={e.newOwner}
                    tribe={e.newOwnerTribe}
                  />
                );
              }
              return '-';
            },
          },
        ]}
        loading={loading}
        data={ennoblements}
        size="small"
        footerProps={{
          page: query.page,
          rowsPerPage: limit,
          count: total,
          onChangePage: page => {
            setQuery({ page });
          },
          onChangeRowsPerPage: rowsPerPage => {
            setQuery({ limit: rowsPerPage, page: 0 });
          },
        }}
      />
    </Paper>
  );
}

export default Ennoblements;
