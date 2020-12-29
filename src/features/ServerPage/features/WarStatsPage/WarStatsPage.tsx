import React, { useRef, useMemo, useState } from 'react';
import { subDays } from 'date-fns';
import { useQueryParams, DateTimeParam, withDefault } from 'use-query-params';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import useServer from '../../libs/ServerContext/useServer';
import useSide from './useSide';
import { ENNOBLEMENTS } from './queries';
import { SERVER_PAGE } from '@config/namespaces';

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import DateTimePicker from '@common/Picker/DateTimePicker';
import ServerPageLayout from '@features/ServerPage/common/PageLayout/PageLayout';
import Spinner from '@common/Spinner/Spinner';
import Card from './components/Card/Card';
import OneSide from './components/OneSide/OneSide';
import Result from './components/Result/Result';

import {
  EnnoblementsQueryResult,
  EnnoblementsQueryVariables,
  Result as ResultT,
  SideResult,
} from './types';

function WarStatsPage() {
  const now = useRef(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ResultT | null>(null);
  const [query, setQuery] = useQueryParams({
    ennobledAtGTE: withDefault(DateTimeParam, subDays(now.current, 1)),
    ennobledAtLTE: withDefault(DateTimeParam, now.current),
  });
  const client = useApolloClient();
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

  const getSideResult = (
    totalGained = 0,
    totalLost = 0,
    tribesGained = 0,
    playersGained = 0
  ): SideResult => {
    return {
      gained: totalGained,
      lost: totalLost,
      againstOppositeSide: tribesGained + playersGained,
      difference: Math.abs(totalGained - totalLost),
    };
  };

  const handleSubmit = async (e: React.FormEvent<{}>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const sideOnePlayerIDs = sideOnePlayers.map(player => player.id);
      const sideOneTribeIDs = sideOneTribes.map(tribe => tribe.id);
      const sideTwoPlayerIDs = sideTwoPlayers.map(player => player.id);
      const sideTwoTribeIDs = sideTwoTribes.map(tribe => tribe.id);
      const defFilter = {
        ennobledAtGTE: query.ennobledAtGTE,
        ennobledAtLTE: query.ennobledAtLTE,
      };
      const { data } = await client.query<
        EnnoblementsQueryResult,
        EnnoblementsQueryVariables
      >({
        query: ENNOBLEMENTS,
        fetchPolicy: 'network-only',
        variables: {
          server: server.key,
          skipSideOnePlayers: sideOnePlayerIDs.length === 0,
          skipSideOneTribes: sideOneTribeIDs.length === 0,
          skipSideTwoPlayers: sideTwoPlayerIDs.length === 0,
          skipSideTwoTribes: sideOneTribeIDs.length === 0,
          sideOneTotalGainedFilter: {
            or: {
              newOwnerID: sideOnePlayerIDs,
              newOwnerTribeID: sideOneTribeIDs,
            },
            ...defFilter,
          },
          sideOneTotalLostFilter: {
            or: {
              oldOwnerID: sideOnePlayerIDs,
              oldOwnerTribeID: sideOneTribeIDs,
            },
            ...defFilter,
          },
          sideOnePlayersFilter: {
            newOwnerID: sideOnePlayerIDs,
            or: {
              oldOwnerID: sideTwoPlayerIDs,
              oldOwnerTribeID: sideTwoTribeIDs,
            },
            ...defFilter,
          },
          sideOneTribesFilter: {
            newOwnerTribeID: sideOneTribeIDs,
            or: {
              oldOwnerID: sideTwoPlayerIDs,
              oldOwnerTribeID: sideTwoTribeIDs,
            },
            ...defFilter,
          },
          sideTwoTotalGainedFilter: {
            or: {
              newOwnerID: sideTwoPlayerIDs,
              newOwnerTribeID: sideTwoTribeIDs,
            },
            ...defFilter,
          },
          sideTwoTotalLostFilter: {
            or: {
              oldOwnerID: sideTwoPlayerIDs,
              oldOwnerTribeID: sideTwoTribeIDs,
            },
            ...defFilter,
          },
          sideTwoPlayersFilter: {
            newOwnerID: sideTwoPlayerIDs,
            or: {
              oldOwnerID: sideOnePlayerIDs,
              oldOwnerTribeID: sideOneTribeIDs,
            },
            ...defFilter,
          },
          sideTwoTribesFilter: {
            newOwnerTribeID: sideTwoTribeIDs,
            or: {
              oldOwnerID: sideOnePlayerIDs,
              oldOwnerTribeID: sideOneTribeIDs,
            },
            ...defFilter,
          },
        },
      });
      const computedSideOneResult: SideResult = getSideResult(
        data.sideOneTotalGained?.total,
        data.sideOneTotalLost?.total,
        data.sideOneTribes?.total,
        data.sideOnePlayers?.total
      );
      const computedSideTwoResult: SideResult = getSideResult(
        data.sideTwoTotalGained?.total,
        data.sideTwoTotalLost?.total,
        data.sideTwoTribes?.total,
        data.sideTwoPlayers?.total
      );
      setResult({
        sideOne: computedSideOneResult,
        sideTwo: computedSideTwoResult,
        difference: Math.abs(
          computedSideOneResult.againstOppositeSide -
            computedSideTwoResult.againstOppositeSide
        ),
      });
    } catch (error) {}
    setIsSubmitting(false);
  };

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
          <form onSubmit={handleSubmit}>
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
                        disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </Card>
              <Grid item xs={12}>
                <Typography align="center" component="div">
                  <Button
                    type="submit"
                    size="large"
                    color="secondary"
                    variant="contained"
                    disabled={
                      isSubmitting ||
                      (sideOnePlayers.length === 0 &&
                        sideOneTribes.length === 0) ||
                      (sideTwoPlayers.length === 0 &&
                        sideTwoTribes.length === 0)
                    }
                  >
                    {t('buttons.generateStats')}
                  </Button>
                </Typography>
              </Grid>
              {result && (
                <Grid item xs={12}>
                  <Result data={result} />
                </Grid>
              )}
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
