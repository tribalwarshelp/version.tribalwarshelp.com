import React, { useState } from 'react';
import {
  useQueryParams,
  NumberParam,
  withDefault,
  BooleanParam,
} from 'use-query-params';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import useTitle from '@libs/useTitle';
import useServer from '../../libs/ServerContext/useServer';
import useMarkers from './useMarkers';
import ColorParam from '@libs/serialize-query-params/ColorParam';
import { encodeMarker } from './helpers';
import { MAP_SERVICE } from '@config/app';
import { SERVER_PAGE } from '@config/namespaces';
import { PLAYERS, TRIBES } from './queries';

import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import ServerPageLayout, {
  Props as ServerPageLayoutProps,
} from '@features/ServerPage/common/PageLayout/PageLayout';
import ColorInput from '@common/Form/ColorInput';
import Spinner from '@common/Spinner/Spinner';
import Map from './components/Map/Map';
import MarkerField from './components/MarkerField/MarkerField';
import Card from './components/Card/Card';

import {
  PlayersQueryVariables,
  TribesQueryVariables,
} from '@libs/graphql/types';
import { Tribe, Player, PlayerList, TribeList, Settings } from './types';

function MapPage() {
  const [mapURL, setMapURL] = useState<string>('');
  const [query, setQuery] = useQueryParams({
    showBarbarian: withDefault(BooleanParam, false),
    largerMarkers: withDefault(BooleanParam, false),
    markersOnly: withDefault(BooleanParam, false),
    centerX: withDefault(NumberParam, 500),
    centerY: withDefault(NumberParam, 500),
    scale: withDefault(NumberParam, 1),
    showGrid: withDefault(BooleanParam, true),
    showContinentNumbers: withDefault(BooleanParam, true),
    backgroundColor: withDefault(ColorParam, '#000000'),
    gridLineColor: withDefault(ColorParam, '#ffffff'),
    continentNumberColor: withDefault(ColorParam, '#ffffff'),
  });
  const client = useApolloClient();
  const { key } = useServer();
  const {
    markers: tribeMarkers,
    createDeleteMarkerHandler: createDeleteTribeMarkerHandler,
    createUpdateMarkerColorHandler: createUpdateTribeMarkerColorHandler,
    createUpdateMarkerItemHandler: createUpdateTribeMarkerItemHandler,
    handleAddMarker: handleAddTribeMarker,
    loading: loadingTribeMarkers,
  } = useMarkers<Tribe, TribesQueryVariables>(client, {
    paramName: 'tribe',
    query: TRIBES,
    dataKey: 'tribes',
    getVariables: ids => ({ server: key, filter: { id: ids, exists: true } }),
  });
  const {
    markers: playerMarkers,
    createDeleteMarkerHandler: createDeletePlayerMarkerHandler,
    createUpdateMarkerColorHandler: createUpdatePlayerMarkerColorHandler,
    createUpdateMarkerItemHandler: createUpdatePlayerMarkerItemHandler,
    handleAddMarker: handleAddPlayerMarker,
    loading: loadingPlayerMarkers,
  } = useMarkers<Player, PlayersQueryVariables>(client, {
    paramName: 'player',
    query: PLAYERS,
    dataKey: 'players',
    getVariables: ids => ({ server: key, filter: { id: ids, exists: true } }),
  });
  const classes = useStyles();
  const { t } = useTranslation(SERVER_PAGE.MAP_PAGE);
  useTitle(t('title', { key }));
  const loading = loadingTribeMarkers || loadingPlayerMarkers;
  const centerFlex = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  let serverPageLayoutProps: ServerPageLayoutProps = loading
    ? {
        noPadding: true,
        contentStyle: centerFlex as React.CSSProperties,
      }
    : {};

  const createSettingsChangeHandler = (key: keyof Settings) => (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    colorOrChecked?: string | boolean
  ) => {
    setQuery({
      [key]:
        typeof colorOrChecked === 'boolean' ||
        typeof colorOrChecked === 'string'
          ? colorOrChecked
          : e.target.value,
    });
  };

  const searchPlayers = async (searchValue: string): Promise<Player[]> => {
    try {
      const { data } = await client.query<PlayerList, PlayersQueryVariables>({
        query: PLAYERS,
        variables: {
          limit: 10,
          filter: {
            exists: true,
            nameIEQ: searchValue + '%',
          },
          server: key,
          offset: 0,
          sort: ['points DESC'],
        },
        fetchPolicy: 'network-only',
      });
      return data.players?.items ?? [];
    } catch (error) {
      return [];
    }
  };

  const searchTribes = async (searchValue: string): Promise<Tribe[]> => {
    try {
      const { data } = await client.query<TribeList, TribesQueryVariables>({
        query: TRIBES,
        variables: {
          limit: 10,
          filter: {
            exists: true,
            tagIEQ: searchValue + '%',
          },
          server: key,
          offset: 0,
          sort: ['points DESC'],
        },
        fetchPolicy: 'network-only',
      });
      return data.tribes?.items ?? [];
    } catch (error) {
      return [];
    }
  };

  const handleSubmit = (e: React.FormEvent<{}>) => {
    e.preventDefault();

    let queryString = '';
    Object.entries(query).forEach(
      ([key, value]: [string, string | number | boolean]) => {
        queryString += key + '=' + encodeURIComponent(value) + '&';
      }
    );
    playerMarkers.forEach(marker => {
      if (!marker.item) return;
      queryString +=
        'player=' + encodeMarker(marker.item.id, marker.color) + '&';
    });
    tribeMarkers.forEach(marker => {
      if (!marker.item) return;
      queryString +=
        'tribe=' + encodeMarker(marker.item.id, marker.color) + '&';
    });

    setMapURL(MAP_SERVICE + '/' + key + '?' + queryString);
  };

  const tribeGetOptionLabel = (tribe: Tribe) => (tribe ? tribe.tag : '');
  const tribeGetOptionSelected = (option: Tribe, value: Tribe) =>
    option && value ? option.tag === value.tag : false;
  const playerGetOptionLabel = (player: Player) => (player ? player.name : '');
  const playerGetOptionSelected = (option: Player, value: Player) =>
    option && value ? option.name === value.name : false;

  return (
    <ServerPageLayout {...serverPageLayoutProps}>
      {loading && (
        <Spinner
          containerProps={{
            ...centerFlex,
            textAlign: 'center',
            height: '100%',
            paddingY: 5,
          }}
          description={t('loading')}
        />
      )}
      {!loading && (
        <Container>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Card>
                <Typography
                  variant="h4"
                  component="h3"
                  align="center"
                  gutterBottom
                >
                  {t('sections.settings')}
                </Typography>
                <div className={classes.formGroup}>
                  <TextField
                    label={t('inputLabels.zoomLevel')}
                    type="number"
                    name="scale"
                    value={query.scale}
                    onChange={createSettingsChangeHandler('scale')}
                    fullWidth
                    variant="standard"
                    inputProps={{
                      min: 1,
                      max: 5,
                      step: '.01',
                    }}
                  />
                  <TextField
                    label={t('inputLabels.centerX')}
                    type="number"
                    name="centerX"
                    value={query.centerX}
                    onChange={createSettingsChangeHandler('centerX')}
                    fullWidth
                    variant="standard"
                    inputProps={{
                      min: 0,
                      max: 1000,
                      step: '.01',
                    }}
                  />
                  <TextField
                    label={t('inputLabels.centerY')}
                    type="number"
                    name="centerY"
                    value={query.centerY}
                    onChange={createSettingsChangeHandler('centerY')}
                    fullWidth
                    variant="standard"
                    inputProps={{
                      min: 0,
                      max: 1000,
                      step: '.01',
                    }}
                  />
                  <ColorInput
                    color={query.backgroundColor}
                    onChange={createSettingsChangeHandler('backgroundColor')}
                    fullWidth
                    variant="standard"
                    name="backgroundColor"
                    label={t('inputLabels.backgroundColor')}
                  />
                  <ColorInput
                    color={query.gridLineColor}
                    onChange={createSettingsChangeHandler('gridLineColor')}
                    fullWidth
                    variant="standard"
                    name="gridLineColor"
                    label={t('inputLabels.gridLineColor')}
                  />
                  <ColorInput
                    color={query.continentNumberColor}
                    onChange={createSettingsChangeHandler(
                      'continentNumberColor'
                    )}
                    fullWidth
                    variant="standard"
                    name="continentNumberColor"
                    label={t('inputLabels.continentNumberColor')}
                  />
                  {[
                    {
                      name: 'markersOnly',
                      checked: query.markersOnly,
                      onChange: createSettingsChangeHandler('markersOnly'),
                    },
                    {
                      name: 'showBarbarian',
                      checked: query.showBarbarian,
                      onChange: createSettingsChangeHandler('showBarbarian'),
                    },
                    {
                      name: 'largerMarkers',
                      checked: query.largerMarkers,
                      onChange: createSettingsChangeHandler('largerMarkers'),
                    },
                    {
                      name: 'showGrid',
                      checked: query.showGrid,
                      onChange: createSettingsChangeHandler('showGrid'),
                    },
                    {
                      name: 'showContinentNumbers',
                      checked: query.showContinentNumbers,
                      onChange: createSettingsChangeHandler(
                        'showContinentNumbers'
                      ),
                    },
                  ].map(({ name, checked, onChange }) => {
                    return (
                      <FormControlLabel
                        key={name}
                        label={t('inputLabels.' + name)}
                        control={
                          <Checkbox
                            name={name}
                            checked={checked}
                            onChange={onChange}
                          />
                        }
                      />
                    );
                  })}
                </div>
              </Card>
              <Card>
                <Typography
                  variant="h4"
                  component="h3"
                  align="center"
                  gutterBottom
                >
                  {t('sections.tribeMarkers')}
                </Typography>
                <div className={classes.formGroup}>
                  {tribeMarkers.map(marker => {
                    return (
                      <MarkerField
                        key={marker.id}
                        onDelete={createDeleteTribeMarkerHandler(marker.id)}
                        onChange={createUpdateTribeMarkerItemHandler(marker.id)}
                        onChangeColor={createUpdateTribeMarkerColorHandler(
                          marker.id
                        )}
                        loadingText={t('loading')}
                        noOptionsText={t('noOptions')}
                        loadSuggestions={searchTribes}
                        getOptionLabel={tribeGetOptionLabel}
                        getOptionSelected={tribeGetOptionSelected}
                        color={marker.color}
                        value={marker.item}
                      />
                    );
                  })}
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={handleAddTribeMarker}
                    disabled={tribeMarkers.length >= 100}
                  >
                    {t('buttons.addMarker')}
                  </Button>
                </div>
              </Card>
              <Card>
                <Typography
                  variant="h4"
                  component="h3"
                  align="center"
                  gutterBottom
                >
                  {t('sections.playerMarkers')}
                </Typography>
                <div className={classes.formGroup}>
                  {playerMarkers.map(marker => {
                    return (
                      <MarkerField
                        key={marker.id}
                        onDelete={createDeletePlayerMarkerHandler(marker.id)}
                        onChange={createUpdatePlayerMarkerItemHandler(
                          marker.id
                        )}
                        onChangeColor={createUpdatePlayerMarkerColorHandler(
                          marker.id
                        )}
                        noOptionsText={t('noOptions')}
                        loadSuggestions={searchPlayers}
                        getOptionLabel={playerGetOptionLabel}
                        getOptionSelected={playerGetOptionSelected}
                        color={marker.color}
                        value={marker.item}
                      />
                    );
                  })}
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={handleAddPlayerMarker}
                    disabled={playerMarkers.length >= 100}
                  >
                    {t('buttons.addMarker')}
                  </Button>
                </div>
              </Card>
              <Grid item xs={12}>
                <Typography align="center" component="div">
                  <Button
                    type="submit"
                    size="large"
                    color="secondary"
                    variant="contained"
                  >
                    {t('buttons.generateNewMap')}
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </form>
          {mapURL && <Map src={mapURL} alt={key} t={t} />}
        </Container>
      )}
    </ServerPageLayout>
  );
}

const useStyles = makeStyles(theme => ({
  formGroup: {
    '& > *': {
      marginBottom: theme.spacing(1),
    },
  },
}));

export default MapPage;
