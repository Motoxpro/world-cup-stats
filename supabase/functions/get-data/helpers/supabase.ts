/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { SupabaseClient } from '@supabase/supabase-js';
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// @ts-ignore
import * as env from '../../env.ts';
// @ts-ignore
import { Database } from '../../database.types.ts';

export const supabase = createClient(
  env.isLocal ? env.SUPABASE_URL : Deno.env.get('SUPABASE_URL'),
  env.isLocal ? env.SUPABASE_SERVICE_ROLE_KEY : Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
) as SupabaseClient<Database>;
