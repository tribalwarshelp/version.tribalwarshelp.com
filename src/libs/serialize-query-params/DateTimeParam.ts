import { QueryParamConfig } from 'use-query-params';
import DateUtils from '@libs/date/DateUtils';
import { getEncodedValue } from './helpers';

type Decoded = {
  display: Date;
  server: Date;
};

export default class DateTimeParam
  implements QueryParamConfig<Date, Decoded | undefined> {
  private dateUtils: DateUtils;
  constructor({ dateUtils }: { dateUtils: DateUtils }) {
    this.dateUtils = dateUtils;
  }

  public newDecodedDate = (val: any): Decoded => {
    return {
      server: new Date(val),
      display: this.dateUtils.date(val),
    };
  };

  public encode = (
    date: Date | null | undefined
  ): string | null | undefined => {
    if (!date) {
      return undefined;
    }

    return this.dateUtils.zonedTimeToUTC(date).toISOString();
  };

  public decode = (
    input: string | (string | null)[] | null | undefined
  ): Decoded | undefined => {
    const dateString = getEncodedValue(input);
    if (dateString === null) return undefined;

    const decoded = this.newDecodedDate(dateString);
    if (isNaN(decoded.server.getTime()) || isNaN(decoded.server.getTime())) {
      return undefined;
    }

    return decoded;
  };
}
