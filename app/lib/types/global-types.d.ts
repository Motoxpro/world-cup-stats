export type Primitive = number | string | boolean | bigint | symbol | null | undefined;

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
    ? []
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      T extends Array<any> | string
      ? string[]
      : never;

export type HTTPError = {
  statusCode: number;
  message: string;
  error: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
  interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
