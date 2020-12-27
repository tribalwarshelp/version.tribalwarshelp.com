import { QueryParamConfig } from 'use-query-params';

export const isValidColor = (c: string): boolean => {
  var s = new Option().style;
  s.color = c;
  return s.color.length > 0;
};

const SortParam: QueryParamConfig<string, string | undefined> = {
  encode(value: string): string {
    return value;
  },

  decode(
    value: string | (string | null)[] | null | undefined
  ): string | undefined {
    const color = Array.isArray(value) ? value[0] : value;
    if (!color) {
      return undefined;
    }
    var s = new Option().style;
    s.color = color;
    return isValidColor(color) ? color : undefined;
  },
};

export default SortParam;
