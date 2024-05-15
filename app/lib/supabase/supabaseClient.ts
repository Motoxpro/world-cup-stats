import { SupabaseClient } from '@supabase/supabase-js';
import { createServerClient, parse, serialize, createBrowserClient } from '@supabase/ssr';
import { AppEnv } from '~/lib/zodSchema';
import { Database } from '../../../supabase/functions/database.types';

export function getSupabaseServerClient(
  request: Request,
  // context: LoaderFunctionArgs['context'],
): SupabaseClient<Database> {
  const cookies = parse(request.headers.get('Cookie') ?? '');
  const headers = new Headers();
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      get(key) {
        return cookies[key];
      },
      set(key, value, options) {
        headers.append('Set-Cookie', serialize(key, value, options));
      },
      remove(key, options) {
        headers.append('Set-Cookie', serialize(key, '', options));
      },
    },
  });
}

export function getSupabaseBrowserClient(env: AppEnv): SupabaseClient<Database> {
  return createBrowserClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!);
}
