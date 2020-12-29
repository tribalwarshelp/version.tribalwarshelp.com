import React, { useRef, useMemo } from 'react';
import { subDays } from 'date-fns';
import { useQueryParams, DateTimeParam, withDefault } from 'use-query-params';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '../../libs/ServerContext/useServer';
import useSide from './useSide';
import { SERVER_PAGE } from '@config/namespaces';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, TextField } from '@material-ui/core';
import DateTimePicker from '@common/Picker/DateTimePicker';
import ServerPageLayout from '@features/ServerPage/common/PageLayout/PageLayout';
import Spinner from '@common/Spinner/Spinner';
import Card from './components/Card/Card';
import OneSide from './components/OneSide/OneSide';

function WarStatsPage() {
  const now = useRef(new Date());
  const [query, setQuery] = useQueryParams({
    ennobledAtGTE: withDefault(DateTimeParam, subDays(now.current, 1)),
    ennobledAtLTE: withDefault(DateTimeParam, now.current),
  });
  const classes = useStyles();
  const server = useServer();
  const { t } = useTranslation(SERVER_PAGE.WAR_STATS_PAGE);
  useTitle(t('title', { key: server.key }));
  const {
    players: sideOnePlayers,
    tribes: sideOneTribes,
    loading: sideOneLoading,
    handleChangePlayers: sideOneHandleChangePlayers,
    handleChangeTribes: sideOneHandleChangeTribes,
  } = useSide(server.key, { paramNamePrefix: 'sideOne' });
  const {
    players: sideTwoPlayers,
    tribes: sideTwoTribes,
    loading: sideTwoLoading,
    handleChangePlayers: sideTwoHandleChangePlayers,
    handleChangeTribes: sideTwoHandleChangeTribes,
  } = useSide(server.key, { paramNamePrefix: 'sideTwo' });
  const selectedPlayersIDs = useMemo(() => {
    return [...sideOnePlayers.map(p => p.id), ...sideTwoPlayers.map(p => p.id)];
  }, [sideOnePlayers, sideTwoPlayers]);
  const selectedTribesIDs = useMemo(() => {
    return [...sideOneTribes.map(p => p.id), ...sideTwoTribes.map(p => p.id)];
  }, [sideOneTribes, sideTwoTribes]);
  const loading = sideTwoLoading || sideOneLoading;

  return (
    <ServerPageLayout>
      {loading && (
        <Spinner
          containerProps={{
            minHeight: 'inherit',
            textAlign: 'center',
            paddingY: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          description={t('loading')}
        />
      )}
      {!loading && (
        <Container>
          <form>
            <Grid container spacing={2}>
              <Card>
                <Typography variant="h4" align="center" gutterBottom>
                  {t('sections.settings')}
                </Typography>
                <div className={classes.formGroup}>
                  {[
                    {
                      name: 'ennobledAtGTE',
                      val: query.ennobledAtGTE,
                      maxDate: query.ennobledAtLTE,
                    },
                    {
                      name: 'ennobledAtLTE',
                      val: query.ennobledAtLTE,
                      minDate: query.ennobledAtGTE,
                    },
                  ].map(({ name, val, maxDate, minDate }) => {
                    return (
                      <DateTimePicker
                        key={name}
                        maxDate={maxDate}
                        minDate={minDate}
                        disableFuture
                        TextFieldComponent={props => {
                          return (
                            <TextField
                              {...props}
                              helperText=""
                              fullWidth
                              variant="standard"
                            />
                          );
                        }}
                        label={t('inputLabels.' + name)}
                        value={val}
                        format="yyyy/MM/dd HH:mm"
                        onChange={d => {
                          setQuery({ [name]: d ? d : undefined });
                        }}
                      />
                    );
                  })}
                </div>
              </Card>
              <Card>
                <OneSide
                  title={t('sections.sideOne')}
                  players={sideOnePlayers}
                  tribes={sideOneTribes}
                  onChangePlayers={sideOneHandleChangePlayers}
                  onChangeTribes={sideOneHandleChangeTribes}
                  server={server.key}
                  tribeIDNEQ={selectedTribesIDs}
                  playerIDNEQ={selectedPlayersIDs}
                  className={classes.formGroup}
                />
              </Card>
              <Card>
                <OneSide
                  title={t('sections.sideTwo')}
                  players={sideTwoPlayers}
                  tribes={sideTwoTribes}
                  onChangePlayers={sideTwoHandleChangePlayers}
                  onChangeTribes={sideTwoHandleChangeTribes}
                  server={server.key}
                  tribeIDNEQ={selectedTribesIDs}
                  playerIDNEQ={selectedPlayersIDs}
                  className={classes.formGroup}
                />
              </Card>
            </Grid>
          </form>
        </Container>
      )}
    </ServerPageLayout>
  );
}

const useStyles = makeStyles(theme => ({
  formGroup: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));

export default WarStatsPage;
