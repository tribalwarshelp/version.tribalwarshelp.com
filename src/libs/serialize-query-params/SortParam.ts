import { QueryParamConfig } from 'use-query-params';

export type DecodedSort = {
  orderBy: string;
  orderDirection?: 'asc' | 'desc';
  toString: () => string;
};

const validateOrderDirection = (od: string): DecodedSort['orderDirection'] => {
  od = od.toLowerCase();
  return od === 'asc' ? 'asc' : od === 'desc' ? 'desc' : 'asc';
};

const isDecoded = (obj: any): obj is DecodedSort => {
  return (
    typeof obj.orderBy === 'string' &&
    typeof obj.toString === 'function' &&
    (!obj.orderDirection || ['asc', 'desc'].includes(obj.orderDirection))
  );
};

export const decodeSort = (value: string): DecodedSort => {
  const [orderBy, orderDirection] = value.split(' ');
  return {
    orderBy,
    orderDirection: validateOrderDirection(orderDirection),
    toString(): string {
      return this.orderBy + ' ' + this.orderDirection;
    },
  };
};

const SortParam: QueryParamConfig<string, DecodedSort | undefined> = {
  encode(value: string): string {
    return value;
  },

  decode(
    value:
      | string
      | (string | DecodedSort | null)[]
      | null
      | undefined
      | DecodedSort
  ): DecodedSort | undefined {
    const v = Array.isArray(value) ? value[0] : value;
    if (!v) {
      return undefined;
    }
    if (isDecoded(v)) {
      return v;
    }
    return decodeSort(v);
  },
};

export default SortParam;
