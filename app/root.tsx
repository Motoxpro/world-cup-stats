import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import * as process from 'process';
import { AppEnvSchema } from '~/lib/zodSchema';
import SupabaseProvider from '~/providers/SupabaseProvider';
import { ReactFCC } from '~/lib/types/type-utils';
import tailwindStylesheetUrl from './styles/tailwind.css';
import AuthProvider from './providers/AuthProvider';
import EnvProvider from './providers/EnvProvider';

export const meta: MetaFunction = () => {
  return [{ title: 'World Cup Stats' }];
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStylesheetUrl }];
};

export async function loader() {
  const IS_NODE_ENV_LOCAL = process.env.NODE_ENV === 'development';
  const IS_NODE_ENV_PRODUCTION = process.env.NODE_ENV === 'production';
  const env = AppEnvSchema.parse({
    ...process.env,
    IS_NODE_ENV_LOCAL,
    IS_NODE_ENV_PRODUCTION,
    ENABLE_ANALYTICS: IS_NODE_ENV_PRODUCTION,
  });
  return {
    env,
  };
}

type LoaderType = Awaited<ReturnType<typeof loader>>;

export const ErrorBoundary: ReactFCC = () => {
  // const error = useRouteError();
  // captureRemixErrorBoundaryError(error);
  return <div>Something went wrong. Please try to refresh the page or let Eliot know.</div>;
};

export default function App() {
  const data = useLoaderData<LoaderType>();
  return (
    <html lang="en" className="h-full  bg-gray-900">
      <head>
        <title>World Cup Stats</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <EnvProvider env={data.env}>
          {/*  <SupabaseProvider> */}
          {/*    <AuthProvider> */}
          <Outlet />
          {/* </AuthProvider> */}
          {/* </SupabaseProvider> */}
        </EnvProvider>
      </body>
    </html>
  );
}
