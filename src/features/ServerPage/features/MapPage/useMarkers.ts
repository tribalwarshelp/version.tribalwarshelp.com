import { useState, useEffect } from 'react';
import { useQueryParams, withDefault, ArrayParam } from 'use-query-params';
import { v4 as uuidv4 } from 'uuid';
import { isValidColor } from '@libs/serialize-query-params/ColorParam';

import { ApolloClient, DocumentNode } from '@apollo/client';
import { List } from '@libs/graphql/types';
import { Marker } from './types';

export type MarkerBag<T> = {
  markers: Marker<T>[];
  handleAddMarker: () => void;
  createUpdateMarkerItemHandler: (
    id: string
  ) => (e: React.ChangeEvent<{}>, value: T | null) => void;
  createUpdateMarkerColorHandler: (
    id: string
  ) => (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    color: string
  ) => void;
  createDeleteMarkerHandler: (id: string) => () => void;
  loading: boolean;
};

interface HasID {
  id: number;
}

export interface Options<VariablesT> {
  paramName: string;
  query: DocumentNode;
  dataKey: string;
  getVariables: (ids: number[]) => VariablesT;
}

const useMarkers = <T extends HasID, VariablesT>(
  client: ApolloClient<object>,
  opts: Options<VariablesT>
): MarkerBag<T> => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useQueryParams({
    [opts.paramName]: withDefault(ArrayParam, []),
  });
  const [markers, setMarkers] = useState<Marker<T>[]>([]);

  useEffect(() => {
    const markers: { [key: number]: string } = {};
    query[opts.paramName].forEach((rawStr: string | null) => {
      if (!rawStr) {
        return;
      }
      const [id, color] = rawStr.split(',');
      if (!id || !color) {
        return;
      }
      const idInt = parseInt(id, 10);
      if (isNaN(idInt) && idInt >= 1) {
        return;
      }
      if (!isValidColor(color)) {
        return;
      }

      markers[idInt] = color;
    });

    const ids = Object.keys(markers).map(id => parseInt(id, 10));
    if (ids.length > 0) {
      client
        .query<Record<string, List<T[]>>, VariablesT>({
          query: opts.query,
          variables: opts.getVariables(ids),
          fetchPolicy: 'network-only',
        })
        .then(res => {
          if (opts.dataKey in res.data && res.data[opts.dataKey]) {
            setMarkers(
              res.data[opts.dataKey].items.map(item => {
                return getNewMarker(item, markers[item.id]);
              })
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    } // eslint-disable-next-line
  }, []);

  const getNewMarker = (
    item: T | null = null,
    color: string = '#000000'
  ): Marker<T> => ({
    id: uuidv4(),
    item,
    color,
  });

  const setQueryParam = (markers: Marker<T>[]): void => {
    setQuery({
      [opts.paramName]: markers
        .filter(m => !!m.item)
        .map(m => `${m.item?.id},${m.color}`),
    });
  };

  const handleAddMarker = () => {
    setMarkers([...markers, getNewMarker()]);
  };

  const createDeleteMarkerHandler = (id: string) => () => {
    const newArr = markers.filter(marker => marker.id !== id);
    setMarkers(newArr);
    setQueryParam(newArr);
  };

  const createUpdateMarkerItemHandler = (id: string) => (
    _e: React.ChangeEvent<{}>,
    item: T | null
  ): void => {
    const newArr = markers.map(marker => {
      if (marker.id !== id) return marker;
      if (item || item === null) {
        return {
          ...marker,
          item,
        };
      }
      return marker;
    });
    setMarkers(newArr);
    setQueryParam(newArr);
  };

  const createUpdateMarkerColorHandler = (id: string) => (
    _e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    color: string
  ): void => {
    const newArr = markers.map(marker => {
      if (marker.id !== id) return marker;
      return {
        ...marker,
        color,
      };
    });
    setMarkers(newArr);
    setQueryParam(newArr);
  };

  return {
    markers,
    handleAddMarker,
    createUpdateMarkerItemHandler,
    createUpdateMarkerColorHandler,
    createDeleteMarkerHandler,
    loading,
  };
};

export default useMarkers;
