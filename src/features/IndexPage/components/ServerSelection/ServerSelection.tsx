import React from 'react';
import { useQuery } from '@apollo/client';
import {
  useQueryParams,
  StringParam,
  NumberParam,
  withDefault,
} from 'use-query-params';
import formatDistanceToNow from '@libs/date/formatDistanceToNow';
import { Locale } from '@libs/date/locales';
import useLanguage from '@libs/i18n/useLanguage';
import { SERVER_STATUS } from '@config/app';
import { ServerList } from './types';
import { SERVERS } from './queries';
import extractLangTagFromHostname from '@utils/extractLangTagFromHostname';

import { Grid, Card, CardHeader, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Pagination, {
  Props as PaginationProps,
} from '@common/Pagination/Pagination';

const PER_PAGE = 30;
const arr = new Array(PER_PAGE).fill(0);

export default function ServerSelection() {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 1),
    q: withDefault(StringParam, ''),
  });
  const lang = useLanguage();
  const { data, loading: loadingServers } = useQuery<ServerList>(SERVERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        sort: 'key ASC',
        offset: (query.page - 1) * PER_PAGE,
        keyIEQ: '%' + query.q + '%',
        limit: PER_PAGE,
        langVersionTag: [extractLangTagFromHostname(window.location.hostname)],
      },
    },
  });
  const servers = data?.servers?.items ?? [];
  const total = data?.servers?.total ?? 0;
  const loading = servers.length === 0 && loadingServers;

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setQuery({ page });
  };

  const renderPagination = (top: boolean): JSX.Element => {
    const paginationProps: PaginationProps = {
      total,
      perPage: PER_PAGE,
      size: 'large',
      page: query.page,
      onChange: handlePageChange,
    };
    return (
      <Box
        mb={top ? 3 : 0}
        mt={top ? 0 : 3}
        display="flex"
        justifyContent="center"
      >
        {loading ? (
          <Skeleton variant="rect" width={414} height={40} />
        ) : (
          <Pagination {...paginationProps} />
        )}
      </Box>
    );
  };

  return (
    <div>
      {renderPagination(true)}
      <Grid container spacing={3}>
        {loading
          ? arr.map((_, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader
                      title={<Skeleton variant="text" />}
                      subheader={<Skeleton variant="text" />}
                    />
                  </Card>
                </Grid>
              );
            })
          : servers.map(server => {
              return (
                <Grid key={server.key} item xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader
                      title={`${server.key}${
                        SERVER_STATUS.CLOSED === server.status
                          ? ' (closed)'
                          : ''
                      }`}
                      subheader={
                        <span>
                          {server.numberOfPlayers.toLocaleString()} players
                          <br />
                          {server.numberOfTribes.toLocaleString()} tribes
                          <br />
                          {server.numberOfVillages.toLocaleString()} villages
                          <br />
                          Updated{' '}
                          {formatDistanceToNow(new Date(server.dataUpdatedAt), {
                            locale: lang as Locale,
                            addSuffix: true,
                          })}
                          .
                        </span>
                      }
                    />
                  </Card>
                </Grid>
              );
            })}
      </Grid>
      {renderPagination(false)}
    </div>
  );
}
