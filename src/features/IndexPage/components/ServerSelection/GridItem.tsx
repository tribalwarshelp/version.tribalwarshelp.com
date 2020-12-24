import React from 'react';
import formatNumber from '@utils/formatNumber';
import * as ROUTES from '@config/routes';
import * as NAMESPACES from '@config/namespaces';
import { SERVER_STATUS } from '@config/app';

import {
  Grid,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import Link from '@common/Link/Link';

import { TFunction } from 'i18next';
import { Server } from './types';

export interface Props {
  server?: Server;
  t: TFunction;
}

function GridItem({ t, server }: Props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {server ? (
            <Typography variant="h5">
              <Link
                to={ROUTES.SERVER_PAGE.INDEX_PAGE}
                params={{ key: server.key }}
              >
                {server.key}{' '}
                {SERVER_STATUS.CLOSED === server.status
                  ? `(${t(
                      NAMESPACES.COMMON + `:serverStatus.${server.status}`
                    ).toLowerCase()})`
                  : ''}
              </Link>
            </Typography>
          ) : (
            <Skeleton variant="text" width="100%" />
          )}
        </AccordionSummary>
        {server && (
          <AccordionDetails>
            <Typography>
              {t('serverSelection.numberOfPlayers', {
                count: server.numberOfPlayers,
                num: formatNumber('commas', server.numberOfPlayers),
              })}
              <br />
              {t('serverSelection.numberOfTribes', {
                count: server.numberOfTribes,
                num: formatNumber('commas', server.numberOfTribes),
              })}
              <br />
              {t('serverSelection.numberOfVillages', {
                count: server.numberOfVillages,
                num: formatNumber('commas', server.numberOfVillages),
              })}
              .
            </Typography>
          </AccordionDetails>
        )}
      </Accordion>
    </Grid>
  );
}

export default GridItem;
