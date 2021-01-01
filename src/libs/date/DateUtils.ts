import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import subDays from 'date-fns/subDays';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfDay from 'date-fns/endOfDay';
import endOfWeek from 'date-fns/endOfWeek';
import endOfYear from 'date-fns/endOfYear';
import format from 'date-fns/format';
import getHours from 'date-fns/getHours';
import getSeconds from 'date-fns/getSeconds';
import getYear from 'date-fns/getYear';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';
import isSameDay from 'date-fns/isSameDay';
import isSameYear from 'date-fns/isSameYear';
import isSameMonth from 'date-fns/isSameMonth';
import isSameHour from 'date-fns/isSameHour';
import isValid from 'date-fns/isValid';
import dateFnsParse from 'date-fns/parse';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import setMonth from 'date-fns/setMonth';
import setSeconds from 'date-fns/setSeconds';
import setYear from 'date-fns/setYear';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import startOfYear from 'date-fns/startOfYear';
import differenceInDays from 'date-fns/differenceInDays';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import { Locale } from 'date-fns';
import { IUtils } from '@date-io/core/IUtils';

export default class DateUtils implements IUtils<Date> {
  public static timezone?: string;

  public locale?: Locale;

  public yearFormat = 'yyyy';

  public yearMonthFormat = 'MMMM yyyy';

  public dateTime12hFormat = 'MMMM do hh:mm aaaa';

  public dateTime24hFormat = 'MMMM do HH:mm';

  public time12hFormat = 'hh:mm a';

  public time24hFormat = 'HH:mm';

  public dateFormat = 'MMMM do';

  constructor({ locale }: { locale?: Locale } = {}) {
    this.locale = locale;
  }

  public addDays(value: Date, count: number) {
    return addDays(value, count);
  }

  public subDays(date: Date, amount: number): Date {
    return subDays(date, amount);
  }

  public isValid(value: any) {
    return isValid(this.date(value));
  }

  public getDiff(value: Date, comparing: Date | string) {
    return differenceInMilliseconds(value, this.date(comparing));
  }

  public differenceInDays(dateLeft: Date, dateRight: Date): number {
    return differenceInDays(dateLeft, dateRight);
  }

  public isAfter(value: Date, comparing: Date) {
    return isAfter(value, comparing);
  }

  public isBefore(value: Date, comparing: Date) {
    return isBefore(value, comparing);
  }

  public startOfDay(value: Date) {
    return startOfDay(value);
  }

  public endOfDay(value: Date) {
    return endOfDay(value);
  }

  public getHours(value: Date) {
    return getHours(value);
  }

  public setHours(value: Date, count: number) {
    return setHours(value, count);
  }

  public setMinutes(value: Date, count: number) {
    return setMinutes(value, count);
  }

  public getSeconds(value: Date) {
    return getSeconds(value);
  }

  public setSeconds(value: Date, count: number) {
    return setSeconds(value, count);
  }

  public isSameDay(value: Date, comparing: Date) {
    return isSameDay(value, comparing);
  }

  public isSameMonth(value: Date, comparing: Date) {
    return isSameMonth(value, comparing);
  }

  public isSameYear(value: Date, comparing: Date) {
    return isSameYear(value, comparing);
  }

  public isSameHour(value: Date, comparing: Date) {
    return isSameHour(value, comparing);
  }

  public startOfMonth(value: Date) {
    return startOfMonth(value);
  }

  public endOfMonth(value: Date) {
    return endOfMonth(value);
  }

  public getYear(value: Date) {
    return getYear(value);
  }

  public setYear(value: Date, count: number) {
    return setYear(value, count);
  }

  public dateInTZ(value: any, timezone: string): Date {
    return utcToZonedTime(value, timezone);
  }

  public date(value?: any) {
    if (typeof value === 'undefined') {
      if (!DateUtils.timezone) {
        return new Date();
      }
      return this.dateInTZ(new Date(), DateUtils.timezone);
    }

    if (value instanceof Date) {
      return value;
    }

    if (!DateUtils.timezone) {
      return new Date(value);
    }
    return this.dateInTZ(value, DateUtils.timezone);
  }

  public parse(value: string, formatString: string) {
    if (value === '') {
      return null;
    }

    return dateFnsParse(value, formatString, this.date(), {
      locale: this.locale,
    });
  }

  public format(date: Date, formatString: string) {
    return format(date, formatString, { locale: this.locale });
  }

  public toJSON(date: Date) {
    return (
      this.format(date, 'yyyy-MM-dd') +
      'T' +
      this.format(date, 'HH:mm:ss') +
      'Z'
    );
  }

  public isEqual(date: any, comparing: any) {
    if (date === null && comparing === null) {
      return true;
    }

    return isEqual(date, comparing);
  }

  public isNull(date: Date) {
    return date === null;
  }

  public isAfterDay(date: Date, value: Date) {
    return isAfter(date, endOfDay(value));
  }

  public isBeforeDay(date: Date, value: Date) {
    return isBefore(date, startOfDay(value));
  }

  public isBeforeYear(date: Date, value: Date) {
    return isBefore(date, startOfYear(value));
  }

  public isAfterYear(date: Date, value: Date) {
    return isAfter(date, endOfYear(value));
  }

  public formatNumber(numberToFormat: string) {
    return numberToFormat;
  }

  public getMinutes(date: Date) {
    return date.getMinutes();
  }

  public getMonth(date: Date) {
    return date.getMonth();
  }

  public setMonth(date: Date, count: number) {
    return setMonth(date, count);
  }

  public getMeridiemText(ampm: 'am' | 'pm') {
    return ampm === 'am' ? 'AM' : 'PM';
  }

  public getNextMonth(date: Date) {
    return addMonths(date, 1);
  }

  public getPreviousMonth(date: Date) {
    return addMonths(date, -1);
  }

  public getMonthArray(date: Date) {
    const firstMonth = startOfYear(date);
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(this.getNextMonth(prevMonth));
    }

    return monthArray;
  }

  public mergeDateAndTime(date: Date, time: Date) {
    return this.setMinutes(
      this.setHours(date, this.getHours(time)),
      this.getMinutes(time)
    );
  }

  public getWeekdays() {
    const now = new Date();
    return eachDayOfInterval({
      start: startOfWeek(now, { locale: this.locale }),
      end: endOfWeek(now, { locale: this.locale }),
    }).map(day => this.format(day, 'EEEEEE'));
  }

  public getWeekArray(date: Date) {
    const start = startOfWeek(startOfMonth(date), { locale: this.locale });
    const end = endOfWeek(endOfMonth(date), { locale: this.locale });

    let count = 0;
    let current = start;
    const nestedWeeks: Date[][] = [];

    while (isBefore(current, end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);
      current = addDays(current, 1);
      count += 1;
    }

    return nestedWeeks;
  }

  public getYearRange(start: Date, end: Date) {
    const startDate = startOfYear(start);
    const endDate = endOfYear(end);
    const years: Date[] = [];

    let current = startDate;
    while (isBefore(current, endDate)) {
      years.push(current);
      current = addYears(current, 1);
    }

    return years;
  }

  // displaying methods
  public getCalendarHeaderText(date: Date) {
    return this.format(date, this.yearMonthFormat);
  }

  public getYearText(date: Date) {
    return this.format(date, 'yyyy');
  }

  public getDatePickerHeaderText(date: Date) {
    return this.format(date, 'EEE, MMM d');
  }

  public getDateTimePickerHeaderText(date: Date) {
    return this.format(date, 'MMM d');
  }

  public getMonthText(date: Date) {
    return this.format(date, 'MMMM');
  }

  public getDayText(date: Date) {
    return this.format(date, 'd');
  }

  public getHourText(date: Date, ampm: boolean) {
    return this.format(date, ampm ? 'hh' : 'HH');
  }

  public getMinuteText(date: Date) {
    return this.format(date, 'mm');
  }

  public getSecondText(date: Date) {
    return this.format(date, 'ss');
  }

  public formatDistanceToNow(
    date: Date,
    opts: {
      includeSeconds?: boolean;
      addSuffix?: boolean;
    } = {}
  ) {
    return formatDistanceToNow(date, {
      ...opts,
      locale: this.locale,
    });
  }

  public zonedTimeToUTC(date: Date): Date {
    if (!DateUtils.timezone) {
      return date;
    }
    return zonedTimeToUtc(date, DateUtils.timezone);
  }
}
