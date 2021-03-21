import React, { useState, useMemo } from 'react';
import {
  useQueryParams,
  NumberParam,
  withDefault,
  BooleanParam,
} from 'use-query-params';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import useTitle from 'libs/useTitle';
import useServer from '../../libs/ServerContext/useServer';
import useMarkers from './useMarkers';
import ColorParam from 'libs/serialize-query-params/ColorParam';
import { MAP_SERVICE } from 'config/app';
import { SERVER_PAGE } from 'config/namespaces';
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
import Content from 'common/Content/Content';
import ColorInput from 'common/Form/ColorInput';
import Spinner from 'common/Spinner/Spinner';
import Map from './components/Map/Map';
import MarkerField from './components/MarkerField/MarkerField';
import Card from './components/Card/Card';

import {
  QueryPlayersArgs,
  QueryTribesArgs,
  Tribe,
  Player,
  Query,
} from 'libs/graphql/types';
import { Settings, HasID } from './types';

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
    playerVillageColor: withDefault(ColorParam, '#FF0000'),
    barbarianVillageColor: withDefault(ColorParam, '#808080'),
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
  } = useMarkers<Tribe, QueryTribesArgs>(client, {
    paramName: 'tribe',
    query: TRIBES,
    dataKey: 'tribes',
    getVariables: ids => ({ server: key, filter: { id: ids, exists: true } }),
  });
  const selectedTribeIDs = useMemo(() => {
    return tribeMarkers.filter(m => m.item).map(m => m.item?.id ?? 0);
  }, [tribeMarkers]);
  const {
    markers: playerMarkers,
    createDeleteMarkerHandler: createDeletePlayerMarkerHandler,
    createUpdateMarkerColorHandler: createUpdatePlayerMarkerColorHandler,
    createUpdateMarkerItemHandler: createUpdatePlayerMarkerItemHandler,
    handleAddMarker: handleAddPlayerMarker,
    loading: loadingPlayerMarkers,
  } = useMarkers<Player, QueryPlayersArgs>(client, {
    paramName: 'player',
    query: PLAYERS,
    dataKey: 'players',
    getVariables: ids => ({ server: key, filter: { id: ids, exists: true } }),
  });
  const selectedPlayerIDs = useMemo(() => {
    return playerMarkers.filter(m => m.item).map(m => m.item?.id ?? 0);
  }, [playerMarkers]);
  const classes = useStyles();
  const { t } = useTranslation(SERVER_PAGE.MAP_PAGE);
  useTitle(t('title', { key }));
  const loading = loadingTribeMarkers || loadingPlayerMarkers;

  const createChangeSettingsHandler = (key: keyof Settings) => (
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
      const { data } = await client.query<
        Pick<Query, 'players'>,
        QueryPlayersArgs
      >({
        query: PLAYERS,
        variables: {
          limit: 10,
          filter: {
            exists: true,
            nameIEQ: searchValue + '%',
            idNEQ: selectedPlayerIDs,
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
      const { data } = await client.query<
        Pick<Query, 'tribes'>,
        QueryTribesArgs
      >({
        query: TRIBES,
        variables: {
          limit: 10,
          filter: {
            exists: true,
            tagIEQ: searchValue + '%',
            idNEQ: selectedTribeIDs,
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

  const encodeMarker = (id: number, color: string): string => {
    return encodeURIComponent(id + ',' + color);
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

  const getOptionSelected = (option: HasID, value: HasID) =>
    option && value ? option.id === value.id : false;
  const tribeGetOptionLabel = (tribe: Tribe) => (tribe ? tribe.tag : '');
  const playerGetOptionLabel = (player: Player) => (player ? player.name : '');
  const isDisabled = (id: number, blacklist: number[]) => {
    return blacklist.some(id2 => id === id2);
  };

  if (loading) {
    return (
      <Spinner
        containerProps={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: 'inherit',
          paddingY: 3,
        }}
        description={t('loading')}
      />
    );
  }

  return (
    <Content component="div" minHeight={false}>
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
                  onChange={createChangeSettingsHandler('scale')}
                  fullWidth
                  variant="standard"
                  inputProps={{
                    min: 1,
                    max: 5,
                    step: '.1',
                  }}
                />
                <TextField
                  label={t('inputLabels.centerX')}
                  type="number"
                  name="centerX"
                  value={query.centerX}
                  onChange={createChangeSettingsHandler('centerX')}
                  fullWidth
                  variant="standard"
                  inputProps={{
                    min: 0,
                    max: 1000,
                    step: '1',
                  }}
                />
                <TextField
                  label={t('inputLabels.centerY')}
                  type="number"
                  name="centerY"
                  value={query.centerY}
                  onChange={createChangeSettingsHandler('centerY')}
                  fullWidth
                  variant="standard"
                  inputProps={{
                    min: 0,
                    max: 1000,
                    step: '1',
                  }}
                />
                {[
                  {
                    name: 'backgroundColor',
                    color: query.backgroundColor,
                    onChange: createChangeSettingsHandler('backgroundColor'),
                  },
                  {
                    name: 'playerVillageColor',
                    color: query.playerVillageColor,
                    onChange: createChangeSettingsHandler('playerVillageColor'),
                  },
                  {
                    name: 'barbarianVillageColor',
                    color: query.barbarianVillageColor,
                    onChange: createChangeSettingsHandler(
                      'barbarianVillageColor'
                    ),
                  },
                  {
                    name: 'gridLineColor',
                    color: query.gridLineColor,
                    onChange: createChangeSettingsHandler('gridLineColor'),
                  },
                  {
                    name: 'continentNumberColor',
                    color: query.continentNumberColor,
                    onChange: createChangeSettingsHandler(
                      'continentNumberColor'
                    ),
                  },
                ].map(({ color, name, onChange }) => (
                  <ColorInput
                    key={name}
                    color={color}
                    onChange={onChange}
                    fullWidth
                    variant="standard"
                    name={name}
                    label={t('inputLabels.' + name)}
                  />
                ))}
                {[
                  {
                    name: 'markersOnly',
                    checked: query.markersOnly,
                    onChange: createChangeSettingsHandler('markersOnly'),
                  },
                  {
                    name: 'showBarbarian',
                    checked: query.showBarbarian,
                    onChange: createChangeSettingsHandler('showBarbarian'),
                  },
                  {
                    name: 'largerMarkers',
                    checked: query.largerMarkers,
                    onChange: createChangeSettingsHandler('largerMarkers'),
                  },
                  {
                    name: 'showGrid',
                    checked: query.showGrid,
                    onChange: createChangeSettingsHandler('showGrid'),
                  },
                  {
                    name: 'showContinentNumbers',
                    checked: query.showContinentNumbers,
                    onChange: createChangeSettingsHandler(
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
                      getOptionSelected={getOptionSelected}
                      getOptionDisabled={opt =>
                        isDisabled(opt.id, selectedTribeIDs)
                      }
                      color={marker.color}
                      value={marker.item}
                    />
                  );
                })}
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleAddTribeMarker}
                  disabled={tribeMarkers.length >= 25}
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
                      onChange={createUpdatePlayerMarkerItemHandler(marker.id)}
                      onChangeColor={createUpdatePlayerMarkerColorHandler(
                        marker.id
                      )}
                      noOptionsText={t('noOptions')}
                      loadSuggestions={searchPlayers}
                      getOptionLabel={playerGetOptionLabel}
                      getOptionSelected={getOptionSelected}
                      getOptionDisabled={opt =>
                        isDisabled(opt.id, selectedPlayerIDs)
                      }
                      color={marker.color}
                      value={marker.item}
                    />
                  );
                })}
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleAddPlayerMarker}
                  disabled={playerMarkers.length >= 25}
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
                  color="primary"
                  variant="contained"
                >
                  {t('buttons.generateMap')}
                </Button>
              </Typography>
            </Grid>
            {mapURL && (
              <Grid item xs={12}>
                <Map src={mapURL} alt={key} t={t} />
              </Grid>
            )}
          </Grid>
        </form>
      </Container>
    </Content>
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
