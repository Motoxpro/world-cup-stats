import { FC, PropsWithChildren } from 'react';

export type ReactFCC<T = unknown> = FC<PropsWithChildren<T>>;

export function isNotNullOrUndefined<T>(argument: T | undefined | null): argument is T {
  return argument !== undefined && argument !== null;
}
