import React from 'react';
import { useQuery } from '@apollo/client';
import {
  useQueryParams,
  StringParam,
  NumberParam,
  withDefault,
} from 'use-query-params';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';
import * as ROUTES from '@config/routes';
import * as NAMESPACES from '@config/namespaces';
import { SERVER_STATUS } from '@config/app';
import { ServerList } from './types';
import { SERVERS } from './queries';
import extractVersionCodeFromHostname from '@utils/extractVersionCodeFromHostname';

import {
  Grid,
  Box,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import Pagination, {
  Props as PaginationProps,
} from '@common/Pagination/Pagination';
import Link from '@common/Link/Link';

const PER_PAGE = 48;
const arr = new Array(PER_PAGE).fill(0);

export default function ServerSelection() {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 1),
    q: withDefault(StringParam, ''),
  });
  const { t } = useTranslation(NAMESPACES.INDEX_PAGE);
  const { data, loading: loadingServers } = useQuery<ServerList>(SERVERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        sort: 'key ASC',
        offset: (query.page - 1) * PER_PAGE,
        keyIEQ: '%' + query.q + '%',
        limit: PER_PAGE,
        versionCode: [extractVersionCodeFromHostname(window.location.hostname)],
      },
    },
  });
  const servers = data?.servers?.items ?? [];
  const total = data?.servers?.total ?? 0;
  const loading = loadingServers && servers.length === 0;

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
      <Grid container spacing={2}>
        {loading
          ? arr.map((_, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Skeleton variant="text" width="100%" />
                    </AccordionSummary>
                  </Accordion>
                </Grid>
              );
            })
          : servers.map(server => {
              return (
                <Grid key={server.key} item xs={12} sm={6} md={4} lg={3}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h5">
                        <Link
                          to={generatePath(ROUTES.SERVER_PAGE.INDEX_PAGE, {
                            key: server.key,
                          })}
                        >
                          {server.key}{' '}
                          {SERVER_STATUS.CLOSED === server.status
                            ? `(${t(
                                NAMESPACES.COMMON +
                                  `:serverStatus.${server.status}`
                              ).toLowerCase()})`
                            : ''}
                        </Link>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {t('serverSelection.numberOfPlayers', {
                          count: server.numberOfPlayers,
                          num: server.numberOfPlayers.toLocaleString(),
                        })}
                        <br />
                        {t('serverSelection.numberOfTribes', {
                          count: server.numberOfTribes,
                          num: server.numberOfTribes.toLocaleString(),
                        })}
                        <br />
                        {t('serverSelection.numberOfVillages', {
                          count: server.numberOfVillages,
                          num: server.numberOfVillages.toLocaleString(),
                        })}
                        .
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              );
            })}
      </Grid>
      {renderPagination(false)}
    </div>
  );
}
