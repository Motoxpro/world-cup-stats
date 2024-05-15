/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { RaceResult } from '../helpers/types.ts';
// @ts-ignore
import { generateUniqueId } from '../helpers/helpers.ts';
// @ts-ignore
import { all2024Events, allRaces } from '../helpers/getRaceResults.ts';

import data from './data.json' assert { type: 'json' };
import { upsertResults } from '../helpers/upsertData.ts';

const getResults = async (result): Promise<RaceResult[]> => {
  // get all the data from the local ../../data/saved-data folder
  const currentEvent = all2024Events[0];
  // Get all the results for the current event. Every race cant be happening at once
  // But this way we don't have to think about it and we can just upsert the data
  const race = allRaces[3];
  const eventYear = new Date(currentEvent.startDate).getFullYear();

  return [
    {
      EventId: `${currentEvent.location}_${currentEvent.roundNumber}_${eventYear}_${race.categoryName}_${race.raceName}`,
      StartDate: currentEvent.startDate,
      EndDate: currentEvent.endDate,
      Location: currentEvent.location,
      RoundNumber: currentEvent.roundNumber,
      Year: eventYear,
      CategoryName: race.categoryName,
      RaceName: race.raceName,
      ...result,
    },
  ];
};

export const testFlow = async () => {
  for (const event of data) {
    const raceResults = await getResults(event);
    await upsertResults(raceResults);
  }
};
