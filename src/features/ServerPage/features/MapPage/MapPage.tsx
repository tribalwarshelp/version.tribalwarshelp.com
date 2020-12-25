import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import useTitle from '@libs/useTitle';
import useServer from '../../libs/ServerContext/useServer';
import useMarkers from './useMarkers';
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
import ServerPageLayout from '@features/ServerPage/common/PageLayout/PageLayout';
import ColorInput from '@common/Form/ColorInput';
import Map from './components/Map/Map';
import MarkerField from './components/MarkerField/MarkerField';
import Card from './components/Card/Card';

import {
  PlayersQueryVariables,
  TribesQueryVariables,
} from '@libs/graphql/types';
import {
  Tribe,
  Player,
  PlayerList,
  TribeList,
  Settings,
  PlayerMarker,
  TribeMarker,
} from './types';

function MapPage() {
  const [settings, setSettings] = useState<Settings>({
    showBarbarian: false,
    largerMarkers: false,
    markersOnly: false,
    centerX: 500,
    centerY: 500,
    scale: 1,
    showGrid: true,
    showContinentNumbers: true,
    backgroundColor: '#000000',
    gridLineColor: '#ffffff',
    continentNumberColor: '#ffffff',
  });
  const {
    markers: tribeMarkers,
    createDeleteMarkerHandler: createDeleteTribeMarkerHandler,
    createUpdateMarkerColorHandler: createUpdateTribeMarkerColorHandler,
    createUpdateMarkerItemHandler: createUpdateTribeMarkerItemHandler,
    handleAddMarker: handleAddTribeMarker,
  } = useMarkers<Tribe>();
  const {
    markers: playerMarkers,
    createDeleteMarkerHandler: createDeletePlayerMarkerHandler,
    createUpdateMarkerColorHandler: createUpdatePlayerMarkerColorHandler,
    createUpdateMarkerItemHandler: createUpdatePlayerMarkerItemHandler,
    handleAddMarker: handleAddPlayerMarker,
  } = useMarkers<Player>();
  const [mapURL, setMapURL] = useState<string>('');
  const { key } = useServer();
  const classes = useStyles();
  const client = useApolloClient();
  const { t } = useTranslation(SERVER_PAGE.MAP_PAGE);
  useTitle(t('title', { key }));

  const createSettingsChangeHandler = (key: keyof Settings) => (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    colorOrChecked?: string | boolean
  ) => {
    setSettings({
      ...settings,
      [key]:
        typeof colorOrChecked === 'boolean' ||
        typeof colorOrChecked === 'string'
          ? colorOrChecked
          : e.target.value,
    });
  };

  const handleSettingsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    colorOrChecked?: string | boolean
  ) => {
    setSettings({
      ...settings,
      [e.target.name]:
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

  const encodeMarker = (marker: PlayerMarker | TribeMarker): string => {
    return encodeURIComponent(marker.item?.id + ',' + marker.color);
  };

  const handleSubmit = (e: React.FormEvent<{}>) => {
    e.preventDefault();

    let searchParams = '';
    Object.entries(settings).forEach(
      ([key, value]: [string, string | number | boolean]) => {
        searchParams += key + '=' + encodeURIComponent(value) + '&';
      }
    );
    playerMarkers.forEach(marker => {
      if (!marker.item) return;
      searchParams += 'player=' + encodeMarker(marker) + '&';
    });
    tribeMarkers.forEach(marker => {
      if (!marker.item) return;
      searchParams += 'tribe=' + encodeMarker(marker) + '&';
    });

    setMapURL(MAP_SERVICE + '/' + key + '?' + searchParams);
  };

  const tribeGetOptionLabel = (tribe: Tribe) => (tribe ? tribe.tag : '');
  const tribeGetOptionSelected = (option: Tribe, value: Tribe) =>
    option && value ? option.tag === value.tag : false;
  const playerGetOptionLabel = (player: Player) => (player ? player.name : '');
  const playerGetOptionSelected = (option: Player, value: Player) =>
    option && value ? option.name === value.name : false;

  return (
    <ServerPageLayout>
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
                  value={settings.scale}
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
                  value={settings.centerX}
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
                  value={settings.centerY}
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
                  color={settings.backgroundColor}
                  onChange={createSettingsChangeHandler('backgroundColor')}
                  fullWidth
                  variant="standard"
                  name="backgroundColor"
                  label={t('inputLabels.backgroundColor')}
                />
                <ColorInput
                  color={settings.gridLineColor}
                  onChange={createSettingsChangeHandler('gridLineColor')}
                  fullWidth
                  variant="standard"
                  name="gridLineColor"
                  label={t('inputLabels.gridLineColor')}
                />
                <ColorInput
                  color={settings.continentNumberColor}
                  onChange={createSettingsChangeHandler('continentNumberColor')}
                  fullWidth
                  variant="standard"
                  name="continentNumberColor"
                  label={t('inputLabels.continentNumberColor')}
                />
                {[
                  {
                    name: 'markersOnly',
                    checked: settings.markersOnly,
                    onChange: handleSettingsChange,
                  },
                  {
                    name: 'showBarbarian',
                    checked: settings.showBarbarian,
                    onChange: handleSettingsChange,
                  },
                  {
                    name: 'largerMarkers',
                    checked: settings.largerMarkers,
                    onChange: handleSettingsChange,
                  },
                  {
                    name: 'showGrid',
                    checked: settings.showGrid,
                    onChange: handleSettingsChange,
                  },
                  {
                    name: 'showContinentNumbers',
                    checked: settings.showContinentNumbers,
                    onChange: handleSettingsChange,
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
                      loadSuggestions={searchTribes}
                      getOptionLabel={tribeGetOptionLabel}
                      getOptionSelected={tribeGetOptionSelected}
                      color={marker.color}
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
                      onChange={createUpdatePlayerMarkerItemHandler(marker.id)}
                      onChangeColor={createUpdatePlayerMarkerColorHandler(
                        marker.id
                      )}
                      loadSuggestions={searchPlayers}
                      getOptionLabel={playerGetOptionLabel}
                      getOptionSelected={playerGetOptionSelected}
                      color={marker.color}
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
        {mapURL && (
          <Map src={mapURL} alt={key} loadingInfo={t('infoWhileGenerating')} />
        )}
      </Container>
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
