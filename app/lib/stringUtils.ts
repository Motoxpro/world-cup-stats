/**
 * Title case a string
 * Copyright (c) 2014 Blake Embrey (hello@blakeembrey.com)
 */
const TOKENS = /\S+|./g;
const IS_MANUAL_CASE = /\p{Ll}(?=[\p{Lu}])|\.\p{L}/u; // iPhone, example.com, U.N., etc.
const ALPHANUMERIC_PATTERN = /[\p{L}\d]+/gu;
const WORD_SEPARATORS = new Set(['—', '–', '-', '―', '/']);
const SMALL_WORDS = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'because',
  'but',
  'by',
  'en',
  'for',
  'if',
  'in',
  'neither',
  'nor',
  'of',
  'on',
  'only',
  'or',
  'over',
  'per',
  'so',
  'some',
  'than',
  'that',
  'the',
  'to',
  'up',
  'upon',
  'v',
  'versus',
  'via',
  'vs',
  'when',
  'with',
  'without',
  'yet',
]);
export interface Options {
  smallWords?: Set<string>;
  locale?: string | string[];
}
export function titleCase<T extends string>(
  input: T,
  options: Options | string[] | string = {},
): T {
  let result = '';
  let m: RegExpExecArray | null;

  const { smallWords = SMALL_WORDS, locale } =
    typeof options === 'string' || Array.isArray(options) ? { locale: options } : options;

  // tslint:disable-next-line
  // eslint-disable-next-line no-cond-assign
  while ((m = TOKENS.exec(input)) !== null) {
    const { 0: token, index } = m;

    // Ignore already capitalized words.
    if (IS_MANUAL_CASE.test(token)) {
      result += token;
    } else {
      result += token.replace(ALPHANUMERIC_PATTERN, (letter, i) => {
        // Ignore small words except at beginning or end.
        if (index > 0 && index + token.length < input.length && smallWords.has(letter)) {
          return letter;
        }

        // Only capitalize words after a valid word separator.
        if (i > 1 && !WORD_SEPARATORS.has(input.charAt(index + i - 1))) {
          return letter;
        }

        return letter.charAt(0).toLocaleUpperCase(locale) + letter.slice(1);
      });
    }
  }

  return result as T;
}

/**
 * Convert a number to its ordinal representation.
 * @param num The number to be converted.
 * @returns The ordinal representation of the number as a string.
 */
export function toOrdinal(num: number | null | undefined): string {
  // Handle non-numeric, infinite, or NaN values.
  if ((num !== 0 && !num) || !Number.isFinite(num)) {
    return '';
  }
  // Convert negative numbers to positive for processing
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  let suffix;

  // Handle special cases for 1st, 2nd, and 3rd
  if (absNum % 100 >= 11 && absNum % 100 <= 13) {
    suffix = 'th';
  } else {
    switch (absNum % 10) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
        break;
    }
  }
  // Prepend a negative sign for originally negative numbers
  return (isNegative ? '-' : '') + num.toLocaleString() + suffix;
}
