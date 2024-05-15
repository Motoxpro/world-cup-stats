/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as env from '../env.ts';
// @ts-ignore
import { getRaceResults } from './helpers/getRaceResults.ts';
// @ts-ignore
import { upsertResults } from './helpers/upsertData.ts';
// import { testFlow } from './testing/testFlow.ts';
// @ts-ignore

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

Deno.serve(async (req) => {
  const data = await req.json();
  if (data.SESSION_SECRET !== env.SESSION_SECRET) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const updateData = async (): Promise<void> => {
    // Production
    const raceResults = await getRaceResults();
    await upsertResults(raceResults);

    // Testing
    // await testFlow();
  };

  const execute = async (): Promise<void> => {
    let count = 0;
    while (count <= 60) {
      await updateData();
      await sleep(1000);
      count++;
      console.log('Date:', new Date(), 'Count:', count);
    }
  };
  await execute();

  return new Response(JSON.stringify({ message: 'Success' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
