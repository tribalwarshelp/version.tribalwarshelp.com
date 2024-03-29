import React, { useRef, useState } from 'react';
import formatNumber from 'utils/formatNumber';
import * as ROUTES from 'config/routes';
import * as NAMESPACES from 'config/namespaces';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  ExpandMore as ExpandMoreIcon,
  InfoOutlined as InfoIcon,
} from '@material-ui/icons';
import Link from 'common/Link/Link';

import { TFunction } from 'i18next';
import { Server, ServerStatus } from 'libs/graphql/types';

export interface Props {
  server?: Server;
  t: TFunction;
  hideTooltip?: boolean;
}

function GridItem({ t, server, hideTooltip = true }: Props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);
  const accordion = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.ChangeEvent<{}>, expanded: boolean) => {
    setExpanded(expanded);
  };

  const serverInfo = server ? (
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
    </Typography>
  ) : (
    ''
  );
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Accordion
        expanded={expanded && hideTooltip}
        ref={accordion}
        onChange={hideTooltip ? handleClick : undefined}
      >
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={
            server ? (
              hideTooltip ? (
                <ExpandMoreIcon />
              ) : (
                <Tooltip
                  classes={{
                    tooltip: classes.tooltip,
                  }}
                  title={serverInfo}
                >
                  <InfoIcon color="inherit" />
                </Tooltip>
              )
            ) : undefined
          }
        >
          {server ? (
            <Typography variant="h5">
              <Link
                to={ROUTES.SERVER_PAGE.INDEX_PAGE}
                params={{ key: server.key }}
              >
                {server.key}{' '}
                {ServerStatus.closed === server.status
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
        {server && hideTooltip && (
          <AccordionDetails>{serverInfo}</AccordionDetails>
        )}
      </Accordion>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  accordionSummary: {
    [theme.breakpoints.up('md')]: {
      cursor: 'default !important',
    },
    '@media (hover: none)': {
      cursor: 'pointer !important',
    },
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
  },
}));

export default GridItem;
