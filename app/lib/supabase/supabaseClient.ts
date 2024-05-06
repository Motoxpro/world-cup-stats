import { SupabaseClient } from '@supabase/supabase-js';
import { createServerClient, parse, serialize } from '@supabase/ssr';
import { Database } from './schema';

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

// export function getSupabaseAdminClient(
//   request: Request,
//   context: LoaderFunctionArgs['context'],
// ): SupabaseClient<Database> {
//   if (isBrowser()) {
//     throw new Error('getSupabaseAdminClient must be called on the server');
//   }
//   return createClient(context.env.SUPABASE_URL!, context.env.SUPABASE_SERVICE_ROLE!, {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//     },
//   });
// }
