export function roundDown(num: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.floor(num * factor) / factor;
}
export function roundUp(num: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.ceil(num * factor) / factor;
}
export function roundTo(num: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.round(num * factor) / factor;
}
export const roundToHundredth = (num: number): number => {
  return roundTo(num, 2);
};
export const roundToTenth = (num: number): number => {
  return roundTo(num, 1);
};

export const percentile = (place: number, total: number): number => {
  return roundToTenth((place / total) * 100);
};

export const percentOfTop = (place: number, total: number): number => {
  return 100 - percentile(place, total);
};
