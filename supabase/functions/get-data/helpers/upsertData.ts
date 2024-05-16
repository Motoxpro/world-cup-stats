/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { RaceResult, Rider } from './types.ts';
// @ts-ignore
import { supabase } from './supabase.ts';
// @ts-ignore
import { generateUniqueId } from './helpers.ts';

const titleCase = (str: string): string => {
  return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
};
// Turn JACKSON Eliot into Eliot Jackson
const getRiderFullName = (rider: Rider): string => {
  const name = rider.PrintName.split(' ');
  if (name.length === 2) {
    const firstName = name[1];
    const lastName = name[0];
    return `${firstName} ${titleCase(lastName)}`;
  }
  if (name.length >= 3) {
    const firstName = name[name.length - 1];
    let lastName = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < name.length - 1; i++) {
      lastName += `${titleCase(name[i])} `;
    }
    return `${firstName} ${lastName}`;
  }
  return rider.PrintName;
};

/**
 * Upsert event into the 'Events' table
 */
const upsertEvent = async (result: RaceResult): Promise<void> => {
  const { error } = await supabase.from('Events').upsert(
    {
      Id: result.EventId,
      StartDate: result.StartDate,
      EndDate: result.EndDate,
      Location: result.Location,
      RoundNumber: result.RoundNumber,
      Year: result.Year,
      ContextName: result.ContextName,
      DisplayName: result.DisplayName,
      CategoryName: result.CategoryName,
      RaceName: result.RaceName,
    },
    { onConflict: 'Id', ignoreDuplicates: true },
  );
  if (error) {
    throw new Error(`Error inserting data: ${error.message}`);
  }
};

/**
 * Upsert riders into the 'Riders' table
 */
const upsertRiders = async (result: RaceResult): Promise<void> => {
  const riders = Object.values(result.Riders).map((rider) => ({
    Id: rider.Id,
    Confirmed: rider.Confirmed,
    RaceNr: rider.RaceNr,
    UciRiderId: rider.UciRiderId,
    UciCode: rider.UciCode,
    FamilyName: rider.FamilyName,
    GivenName: rider.GivenName,
    CategoryCode: rider.CategoryCode,
    PrintName: rider.PrintName,
    ScoreboardName: rider.ScoreboardName,
    FullName: getRiderFullName(rider),
    Nation: rider.Nation,
    UciTeamId: rider.UciTeamId,
    UciTeamCode: rider.UciTeamCode,
    UciTeamName: rider.UciTeamName,
    WorldCupRank: rider.WorldCupRank,
    UciRank: rider.UciRank,
    SecondaryRank: rider.SecondaryRank,
    StartOrder: rider.StartOrder,
    StartTime: rider.StartTime,
    Outfit: rider.Outfit,
    BirthDate: rider.BirthDate,
    Protected: !!rider.Protected,
    IntEliteNr: !!rider.IntEliteNr,
    Rso: !!rider.Rso,
    Injury: !!rider.Injury,
    Substitute: !!rider.Substitute,
  }));

  // Insert riders into the 'Riders' table
  const { error } = await supabase
    .from('Riders')
    .upsert(riders, { onConflict: 'UciRiderId' })
    .select();

  if (error) {
    throw new Error(`Error inserting data: ${error.message}`);
  }
};

/**
 * Upsert split times into the 'SplitTimes' table
 */
const upsertSplitTimes = async (result: RaceResult): Promise<void> => {
  const { Riders, OnTrack, LastFinisher, Results } = result;
  const splitTimes = [...OnTrack, ...LastFinisher, ...Results].map((item) => {
    const UciRiderId = Riders[item.RaceNr]?.UciRiderId;
    return {
      Id: `${result.EventId}_${UciRiderId}_${item.Run}_${item.CompletedDistance}`,
      EventId: result.EventId,
      RaceNr: item.RaceNr,
      UciRiderId,
      Run: item.Run,
      LastPoint: item.LastPoint,
      CompletedDistance: item.CompletedDistance,
      Position: item.Position,
      InResult: item.InResult,
      RaceTime: item.RaceTime,
      Status: item.Status,
      Speed: item.Speed,
      StatusTime: item.StatusTime,
      SortOrder: item.SortOrder,
      ExpectedStartTime: item.ExpectedStartTime,
    };
  });

  const { error } = await supabase.from('SplitTimes').upsert(splitTimes, {
    onConflict: 'Id',
  });

  if (error) {
    throw new Error(`Error inserting data: ${error.message}`);
  }
};

export const upsertResults = async (results: RaceResult[]): Promise<void> => {
  await Promise.all(
    results.map(async (result) => {
      await upsertEvent(result);
      await upsertRiders(result);
      await upsertSplitTimes(result);
    }),
  );
};
