import { useState, useEffect } from 'react';
import { useQueryParams, withDefault, ArrayParam } from 'use-query-params';
import { v4 as uuidv4 } from 'uuid';
import { isNil } from 'lodash';
import { isValidColor } from '@libs/serialize-query-params/ColorParam';

import { ApolloClient, DocumentNode } from '@apollo/client';
import { List } from '@libs/graphql/types';
import { Marker, HasID } from './types';

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
    const colorByID: { [key: number]: string } = {};
    const indexByID: { [key: number]: number } = {};
    query[opts.paramName].forEach((rawStr: string | null) => {
      if (!rawStr) {
        return;
      }
      let [index, id, color] = rawStr.split(',');
      if (!color) {
        color = id;
        id = index;
        index = '0';
      }
      if (!id || !color || isNil(index)) {
        return;
      }
      let indexInt = parseInt(index, 10);
      if (isNaN(indexInt)) {
        indexInt = 0;
      }
      const idInt = parseInt(id, 10);
      if (isNaN(idInt) && idInt >= 1) {
        return;
      }
      if (!isValidColor(color)) {
        return;
      }

      colorByID[idInt] = color;
      indexByID[idInt] = indexInt;
    });

    const ids = Object.keys(colorByID).map(id => parseInt(id, 10));
    if (ids.length > 0) {
      loadMarkers(ids, colorByID, indexByID);
    } else {
      setLoading(false);
    } // eslint-disable-next-line
  }, []);

  const loadMarkers = (
    ids: number[],
    colorByID: { [key: number]: string },
    indexByID: { [key: number]: number }
  ) => {
    return client
      .query<Record<string, List<T[]>>, VariablesT>({
        query: opts.query,
        variables: opts.getVariables(ids),
        fetchPolicy: 'network-only',
      })
      .then(res => {
        if (opts.dataKey in res.data && res.data[opts.dataKey]) {
          setMarkers(
            res.data[opts.dataKey].items
              .map(item => {
                return getNewMarker(item, colorByID[item.id]);
              })
              .sort((a, b) => {
                if (a.item && b.item) {
                  return indexByID[a.item.id] - indexByID[b.item.id];
                }
                return 0;
              })
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
        .map((m, index) => `${index},${m.item?.id},${m.color}`),
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
