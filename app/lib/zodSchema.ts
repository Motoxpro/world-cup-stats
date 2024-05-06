import { z } from 'zod';

export const AppEnvSchema = z.object({
  // APP_URL: z.string(),
  ENABLE_ANALYTICS: z.boolean(),
  IS_NODE_ENV_LOCAL: z.boolean(),
  IS_NODE_ENV_PRODUCTION: z.boolean(),
  // PERSPECTIVE_API_KEY: z.string(),
  // SENTRY_DSN: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
});
export type AppEnv = z.infer<typeof AppEnvSchema>;
