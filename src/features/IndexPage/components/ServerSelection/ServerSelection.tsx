import React from 'react';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { useTranslation } from 'react-i18next';
import useServers from './useServers';
import * as NAMESPACES from 'config/namespaces';

import { useTheme } from '@material-ui/core/styles';
import { Grid, Box, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Pagination, {
  Props as PaginationProps,
} from 'common/Pagination/Pagination';
import GridItem from './GridItem';

const PER_PAGE = 48;
const arr = new Array(PER_PAGE).fill(0);

export default function ServerSelection() {
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 1),
  });
  const { t } = useTranslation(NAMESPACES.INDEX_PAGE);
  const { servers, loading, total } = useServers(query.page, PER_PAGE);
  const theme = useTheme();
  const isDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const isTouchDevice = useMediaQuery('(hover: none)');
  const hideTooltip = isDownSM || isTouchDevice;

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
              return <GridItem t={t} key={index} />;
            })
          : servers.map(server => {
              return (
                <GridItem
                  t={t}
                  key={server.key}
                  server={server}
                  hideTooltip={hideTooltip}
                />
              );
            })}
      </Grid>
      {renderPagination(false)}
    </div>
  );
}
