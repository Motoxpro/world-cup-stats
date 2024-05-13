/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { EventContext, RaceResult } from './types.ts';
// @ts-ignore
import { generateUniqueId } from './helpers.ts';

export const allRaces = [
  {
    raceName: 'Timed Training',
    categoryName: 'Men Elite',
    key: 'TT_ME',
  },
  {
    raceName: 'Qualification',
    categoryName: 'Men Elite',
    key: '2',
  },
  {
    raceName: 'Semi-Final',
    categoryName: 'Men Elite',
    key: '91',
  },
  {
    raceName: 'Final',
    categoryName: 'Men Elite',
    key: '3',
  },
  {
    raceName: 'Timed Training',
    categoryName: 'Women Elite',
    key: 'TT_WE',
  },
  {
    raceName: 'Qualification',
    categoryName: 'Women Elite',
    key: '5',
  },
  {
    raceName: 'Semi-Final',
    categoryName: 'Women Elite',
    key: '92',
  },
  {
    raceName: 'Final',
    categoryName: 'Women Elite',
    key: '6',
  },
  {
    raceName: 'Timed Training',
    categoryName: 'Men Junior',
    key: 'TT_MJ',
  },
  {
    raceName: 'Qualification',
    categoryName: 'Men Junior',
    key: '7',
  },
  {
    raceName: 'Final',
    categoryName: 'Men Junior',
    key: '8',
  },
  {
    raceName: 'Timed Training',
    categoryName: 'Women Junior',
    key: 'TT_WJ',
  },
  {
    raceName: 'Qualification',
    categoryName: 'Women Junior',
    key: '9',
  },
  {
    raceName: 'Final',
    categoryName: 'Women Junior',
    key: '10',
  },
] as const;

export const all2024Events = [
  {
    startDate: '2024-05-02T23:00:00Z',
    endDate: '2024-05-05T22:59:00Z',
    dateKey: '20240503_mtb',
    location: 'Fort William, Scotland',
    roundNumber: 1,
  },
  {
    startDate: '2024-05-16T22:00:00Z',
    endDate: '2024-05-19T21:59:00Z',
    dateKey: '20240517_mtb',
    location: 'Bielsko - Biała, Poland',
    roundNumber: 2,
  },
  {
    startDate: '2024-06-06T22:00:00Z',
    endDate: '2024-06-09T21:59:00Z',
    dateKey: '20240607_mtb',
    location: 'Saalfelden Leogang - Salzburgerland, Austria',
    roundNumber: 3,
  },
  {
    startDate: '2024-06-13T22:00:00Z',
    endDate: '2024-06-16T21:59:00Z',
    dateKey: '20240614_mtb',
    location: 'Val di Sole, Trentino, Italy',
    roundNumber: 4,
  },
  {
    startDate: '2024-06-27T22:00:00Z',
    endDate: '2024-07-07T21:59:00Z',
    dateKey: '20240628_mtb',
    location: 'Haute-Savoie, France',
    roundNumber: 5,
  },
  {
    startDate: '2024-09-05T22:00:00Z',
    endDate: '2024-09-08T21:59:00Z',
    dateKey: '20240906_mtb',
    location: 'Loudenvielle - Peyragudes, France',
    roundNumber: 6,
  },
  {
    startDate: '2024-10-04T04:00:00Z',
    endDate: '2024-10-07T03:59:00Z',
    dateKey: '20241004_mtb',
    location: 'Mont-Sainte-Anne, Canada',
    roundNumber: 7,
  },
] as const;

async function fetchUciEventData(dateKey: string, key: string): Promise<EventContext | null> {
  const url = `https://prod.chronorace.be/api/results/generic/uci/${dateKey}/dh?key=${key}`;

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      return await response.json();
    }
    return null;
  } catch (error) {
    // @ts-ignore
    // eslint-disable-next-line no-console
    console.log(`Failed to fetch data: ${error.message}`);
    return null;
  }
}

export const getRaceResults = async (): Promise<RaceResult[]> => {
  // Is there an event happening right now?
  const currentDate = new Date();
  const currentEvent = all2024Events.find((event) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    return startDate <= currentDate && currentDate <= endDate;
  });

  if (!currentEvent) {
    // eslint-disable-next-line no-console
    console.log('No event found');
    return [];
  }

  // Get all the results for the current event. Every race cant be happening at once
  // But this way we don't have to think about it and we can just upsert the data
  const results = await Promise.all(
    allRaces.map(async (race) => {
      const result = await fetchUciEventData(currentEvent.dateKey, race.key);
      if (!result) {
        return null;
      }
      const eventYear = new Date(currentEvent.startDate).getFullYear();
      return {
        EventId: generateUniqueId(
          `${currentEvent.location}_${currentEvent.roundNumber}_${eventYear}_${race.categoryName}_${race.raceName}`,
        ),
        StartDate: currentEvent.startDate,
        EndDate: currentEvent.endDate,
        Location: currentEvent.location,
        RoundNumber: currentEvent.roundNumber,
        Year: eventYear,
        CategoryName: race.categoryName,
        RaceName: race.raceName,
        ...result,
      };
    }),
  );

  return results.filter(Boolean) as RaceResult[];
};
