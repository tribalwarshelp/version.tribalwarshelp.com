import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce';
import useServer from '../../libs/ServerContext/useServer';
import useMarkers from './useMarkers';
import { MAP_SERVICE } from '@config/app';
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
import Map from './components/Map/Map';
import MarkerField from './components/MarkerField/MarkerField';

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

  const handleSettingsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSettings({
      ...settings,
      [e.target.name]:
        e.target.type === 'checkbox' && 'checked' in e.target
          ? e.target.checked
          : e.target.value,
    });
  };
  const debouncedHandleSettingsChange = useDebouncedCallback(
    handleSettingsChange,
    500
  );

  const callDebouncedHandleSettingsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.persist();
    debouncedHandleSettingsChange.callback(e);
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
            <Grid item xs={12} md={4}>
              <Typography
                variant="h4"
                component="h3"
                align="center"
                gutterBottom
              >
                Settings
              </Typography>
              <div className={classes.formGroup}>
                <TextField
                  label="Zoom level"
                  type="number"
                  name="scale"
                  value={settings.scale}
                  onChange={handleSettingsChange}
                  fullWidth
                  variant="standard"
                  inputProps={{
                    min: 1,
                    max: 5,
                    step: '.01',
                  }}
                />
                <TextField
                  label="Center X"
                  type="number"
                  name="centerX"
                  value={settings.centerX}
                  onChange={handleSettingsChange}
                  fullWidth
                  variant="standard"
                  inputProps={{
                    min: 0,
                    max: 1000,
                    step: '.01',
                  }}
                />
                <TextField
                  label="Center Y"
                  type="number"
                  name="centerY"
                  value={settings.centerY}
                  onChange={handleSettingsChange}
                  fullWidth
                  variant="standard"
                  inputProps={{
                    min: 0,
                    max: 1000,
                    step: '.01',
                  }}
                />
                <TextField
                  label="Background color"
                  name="backgroundColor"
                  onChange={callDebouncedHandleSettingsChange}
                  fullWidth
                  type="color"
                  variant="standard"
                />
                <TextField
                  label="Grid line color"
                  name="gridLineColor"
                  onChange={callDebouncedHandleSettingsChange}
                  defaultValue={settings.gridLineColor}
                  fullWidth
                  variant="standard"
                  type="color"
                />
                <TextField
                  label="Continent number color"
                  name="continentNumberColor"
                  onChange={callDebouncedHandleSettingsChange}
                  defaultValue={settings.continentNumberColor}
                  fullWidth
                  variant="standard"
                  type="color"
                />
                <FormControlLabel
                  label="Markers only"
                  control={
                    <Checkbox
                      name="markersOnly"
                      checked={settings.markersOnly}
                      onChange={handleSettingsChange}
                    />
                  }
                />
                <FormControlLabel
                  label="Show barbarian villages"
                  control={
                    <Checkbox
                      name="showBarbarian"
                      checked={settings.showBarbarian}
                      onChange={handleSettingsChange}
                    />
                  }
                />
                <FormControlLabel
                  label="Larger markers"
                  control={
                    <Checkbox
                      name="largerMarkers"
                      checked={settings.largerMarkers}
                      onChange={handleSettingsChange}
                    />
                  }
                />
                <FormControlLabel
                  label="Continent grid"
                  control={
                    <Checkbox
                      name="showGrid"
                      checked={settings.showGrid}
                      onChange={handleSettingsChange}
                    />
                  }
                />
                <FormControlLabel
                  label="Continent numbers"
                  control={
                    <Checkbox
                      name="showContinentNumbers"
                      checked={settings.showContinentNumbers}
                      onChange={handleSettingsChange}
                    />
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h4"
                component="h3"
                align="center"
                gutterBottom
              >
                Tribe markers
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
                      loadSuggestions={searchTribes}
                      getOptionLabel={tribeGetOptionLabel}
                      getOptionSelected={tribeGetOptionSelected}
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
                  Add marker
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h4"
                component="h3"
                align="center"
                gutterBottom
              >
                Player markers
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
                  Add marker
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" component="div">
                <Button
                  type="submit"
                  size="large"
                  color="secondary"
                  variant="contained"
                >
                  Generate new map
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
        {mapURL && <Map src={mapURL} alt={key} />}
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
