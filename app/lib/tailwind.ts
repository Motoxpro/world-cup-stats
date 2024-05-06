import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const mergeClasses = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export const joinClasses = (...inputs: ClassValue[]): string => {
  return clsx(inputs);
};
