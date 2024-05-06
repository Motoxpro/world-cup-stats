export const MAX_TAKE_COUNT = 1000;

export enum AuthProviderEnum {
  Apple = 'apple',
  Google = 'google',
  Email = 'email',
}

/// /////////////////////////////////////////////
// Units
/// /////////////////////////////////////////////
// export const isMetric = getLocales()[0].measurementSystem === 'metric';

/// /////////////////////////////////////////////
// Auth
/// /////////////////////////////////////////////
export const AUTH_TOKEN_SECURE_STORE_KEY = 'auth-token';

export enum AuthTokenProvider {
  Apple = 'apple-auth-token',
  Google = 'google-auth-token',
}

/// /////////////////////////////////////////////
// Saga
/// /////////////////////////////////////////////
export const TOTAL_STAGES_IN_SERIES = 6;
export const MAX_SERIES_DISTANCE_ELIGIBILITY_IN_MILES = 150;
