/**
 * Converts a distance in feet to a distance in miles
 */
export function feetToMiles(feet: number): number {
  return feet / 5280;
}

/**
 * Converts a distance in miles to a distance in feet
 */
export function milesToFeet(miles: number): number {
  return miles * 5280;
}

/**
 * Converts a distance in kilometers to a distance in miles
 */
export function kilometersToMiles(kilometers: number): number {
  return kilometers * 0.621371;
}

/**
 * Converts a distance in miles to a distance in kilometers
 */
export function milesToKilometers(miles: number): number {
  return miles / 0.621371;
}

/**
 * Converts a distance in mm to a distance in inches
 */
export function mmToInches(mm: number): number {
  return mm / 25.4;
}

/**
 * Converts a distance in inches to a distance in mm
 */
export function inchesToMm(inches: number): number {
  return inches * 25.4;
}
