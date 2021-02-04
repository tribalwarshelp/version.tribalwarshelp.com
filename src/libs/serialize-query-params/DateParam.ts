import { QueryParamConfig } from 'use-query-params';
import DateUtils from 'libs/date/DateUtils';
import { getEncodedValue } from './helpers';

type Decoded = {
  display: Date;
  server: Date;
};

export default class DateParam
  implements QueryParamConfig<Date, Decoded | undefined> {
  private dateUtils: DateUtils;
  constructor({ dateUtils }: { dateUtils: DateUtils }) {
    this.dateUtils = dateUtils;
  }

  public newDecodedDate = (val: any): Decoded => {
    return {
      server: new Date(this.dateUtils.toJSON(new Date(val))),
      display: this.dateUtils.date(val),
    };
  };

  public encode = (
    date: Date | null | undefined
  ): string | null | undefined => {
    if (!date) {
      return undefined;
    }

    return this.dateUtils.format(date, 'yyyy-MM-dd');
  };

  public decode = (
    input: string | (string | null)[] | null | undefined
  ): Decoded | undefined => {
    const dateString = getEncodedValue(input);
    if (!dateString) return undefined;

    const parts = dateString.split('-') as any;
    // may only be a year so won't even have a month
    if (parts[1] !== null) {
      parts[1] -= 1; // Note: months are 0-based
    } else {
      // just a year, set the month and day to the first
      parts[1] = 0;
      parts[2] = 1;
    }

    const decoded = this.newDecodedDate(
      new Date(...(parts as [number, number, number]))
    );
    if (isNaN(decoded.server.getTime()) || isNaN(decoded.server.getTime())) {
      return undefined;
    }

    return decoded;
  };
}
