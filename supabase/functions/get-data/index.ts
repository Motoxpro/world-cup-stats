/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as env from '../env.ts';
// @ts-ignore
import { getRaceResults } from './helpers/getRaceResults.ts';
// @ts-ignore
import { upsertResults } from './helpers/upsertData.ts';
// @ts-ignore
import { testFlow } from './testing/testFlow.ts';

Deno.serve(async (req) => {
  const data = await req.json();
  if (data.SESSION_SECRET !== env.SESSION_SECRET) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  // Production
  const raceResults = await getRaceResults();
  await upsertResults(raceResults);

  // Testing
  await testFlow();

  return new Response(JSON.stringify({ message: 'Success' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
