import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Marker } from './types';

export type MarkerBag<T> = {
  markers: Marker<T>[];
  handleAddMarker: () => void;
  createUpdateMarkerItemHandler: (
    id: string
  ) => (e: React.ChangeEvent<{}>, value: T | null) => void;
  createUpdateMarkerColorHandler: (
    id: string
  ) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  createDeleteMarkerHandler: (id: string) => () => void;
};

const useMarkers = <T>(): MarkerBag<T> => {
  const [markers, setMarkers] = useState<Marker<T>[]>([]);

  const getNewMarker = (): Marker<T> => ({
    id: uuidv4(),
    item: undefined,
    color: '#000000',
  });

  const handleAddMarker = () => {
    setMarkers([...markers, getNewMarker()]);
  };

  const createDeleteMarkerHandler = (id: string) => () => {
    setMarkers(markers.filter(marker => marker.id !== id));
  };

  const createUpdateMarkerItemHandler = (id: string) => (
    e: React.ChangeEvent<{}>,
    item: T | null
  ): void => {
    setMarkers(
      markers.map(marker => {
        if (marker.id !== id) return marker;
        if (item || item === null) {
          return {
            ...marker,
            item,
          };
        }
        return marker;
      })
    );
  };

  const createUpdateMarkerColorHandler = (id: string) => (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setMarkers(
      markers.map(marker => {
        if (marker.id !== id) return marker;
        return {
          ...marker,
          color: e.target.value,
        };
      })
    );
  };

  return {
    markers,
    handleAddMarker,
    createUpdateMarkerItemHandler,
    createUpdateMarkerColorHandler,
    createDeleteMarkerHandler,
  };
};

export default useMarkers;
