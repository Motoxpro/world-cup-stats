import format from 'date-fns/format';
import { isEqual, isAfter, isBefore, isSameDay, startOfHour, addHours } from 'date-fns';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import { JsonValue } from '@segment/analytics-react-native/src/types';
import { JsonMap } from '@segment/analytics-react-native';

/** *************************************************************************
 * Formatting Dates
 * ************************************************************************* */
/**
 * Format date to Apr 7
 */
export const formatToMonthDay = (date: Date | string): string => {
  let parsedDate = date;
  if (typeof parsedDate === 'string') {
    parsedDate = new Date(date);
  }
  return format(parsedDate, 'MMM d');
};

/**
 * Format date to Apr 7 at 10:08am
 */
export const formatToMonthDayTime = (date: Date | string): string => {
  let parsedDate = date;
  if (typeof parsedDate === 'string') {
    parsedDate = new Date(date);
  }
  return format(parsedDate, "MMM d 'at' h:mma");
};

/**
 * Date to Mixpanel format
 */
export const dateToMixpanelFormat = (date: Date): string => {
  return format(date, 'yyyy-MM-ddHH:mm:ss');
};
function formatDatesInObjectToMixpanelFormatInternal<T extends JsonValue | Date>(
  obj: T,
): JsonValue {
  // Base case for non-objects (primitives)
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  // Handle Date objects
  if (obj instanceof Date) {
    return dateToMixpanelFormat(obj);
  }
  // Recursively apply to arrays
  if (Array.isArray(obj)) {
    return obj.map(formatDatesInObjectToMixpanelFormatInternal);
  }
  // Recursively apply to objects
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      key,
      formatDatesInObjectToMixpanelFormatInternal(val),
    ]),
  );
}
export function formatDatesInObjectToMixpanelFormat<T extends JsonValue | Date>(obj: T): JsonMap {
  const result = formatDatesInObjectToMixpanelFormatInternal(obj);
  return result as JsonMap;
}

/** *************************************************************************
 * Rounding Dates
 * ************************************************************************* */
export function startOfNextHour(date: Date): Date {
  return addHours(startOfHour(date), 1);
}

/** *************************************************************************
 * Converting Dates
 * ************************************************************************* */
/**
 * convert milliseconds to h:mm:ss.ms
 */
export const convertMillisecondsToTimeString = (ms: number, alwaysShowMs?: boolean): string => {
  const totalSeconds = ms / 1000;
  const seconds = Math.floor(totalSeconds);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const milliseconds = Math.round((totalSeconds % 1) * 100); // two decimal places

  if (hours > 0) {
    return alwaysShowMs
      ? `${hours}:${`0${minutes % 60}`.slice(-2)}:${`0${seconds % 60}`.slice(
          -2,
        )}.${`00${milliseconds}`.slice(-2)}`
      : `${hours}:${`0${minutes % 60}`.slice(-2)}:${`0${seconds % 60}`.slice(-2)}`;
  }
  if (minutes > 0) {
    return alwaysShowMs
      ? `${minutes}:${`0${seconds % 60}`.slice(-2)}.${`00${milliseconds}`.slice(-2)}`
      : `${minutes}:${`0${seconds % 60}`.slice(-2)}`;
  }
  return `${totalSeconds.toFixed(2)}`;
};

/** *************************************************************************
 * Comparing Dates
 * ************************************************************************* */
export const isSameDayMonthYear = (d1: Date, d2: Date): boolean => {
  return isSameDay(d1, d2) && isSameMonth(d1, d2) && isSameYear(d1, d2);
};
export const isSameDateOrBefore = (d1: Date, d2: Date): boolean => {
  return isEqual(d1, d2) ? true : isBefore(d1, d2);
};
export const isSameDateOrAfter = (d1: Date, d2: Date): boolean => {
  return isEqual(d1, d2) ? true : isAfter(d1, d2);
};
export const isDateBetweenInclusive = (
  dateToCheck: Date,
  interval: { end: Date; start: Date },
): boolean => {
  return (
    isSameDateOrAfter(dateToCheck, interval.start) && isSameDateOrBefore(dateToCheck, interval.end)
  );
};
