import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/router';
import { getSupabaseServerClient } from '~/lib/supabase/supabaseClient';
import { User } from '@supabase/supabase-js';

export const isUserVerified = (user: User): boolean => {
  return !!user.user_metadata.isVerified;
};

export async function requireAuth(
  request: Request,
  context: LoaderFunctionArgs['context'],
): Promise<void> {
  const supabase = getSupabaseServerClient(request, context);
  const response = await supabase.auth.getSession();
  if (!response.data.session) {
    throw redirect('/login');
  }
}

export async function prohibitAuth(
  request: Request,
  context: LoaderFunctionArgs['context'],
): Promise<void> {
  const supabase = getSupabaseServerClient(request, context);
  const response = await supabase.auth.getSession();
  if (response.data.session) {
    throw redirect('/');
  }
}
