export type Rider = {
  Id: number;
  Confirmed: boolean;
  RaceNr: number;
  UciRiderId: string;
  UciCode: string;
  FamilyName: string;
  GivenName: string;
  CategoryCode: string;
  PrintName: string;
  ScoreboardName: string;
  FullName: string;
  Nation: string;
  UciTeamId: string;
  UciTeamCode: string;
  UciTeamName: string;
  WorldCupRank: number;
  UciRank: number;
  SecondaryRank: number;
  StartOrder: number;
  StartTime: number;
  Outfit: string;
  BirthDate: string;
  Protected: number;
  IntEliteNr: boolean;
  Rso: number;
  Injury: number;
  Substitute: number;
};

type OnTrack = {
  RaceNr: number;
  Run: number;
  LastPoint: string;
  CompletedDistance: number;
  Position: number;
  InResult: boolean;
  RaceTime: number;
  Status: string;
  Times: Array<{
    RaceTime: number;
    TimeGap: number;
    Position: number;
    Speed: number;
  }>;
  Speed: number;
  StatusTime: number;
  SortOrder: number;
  ExpectedStartTime: number;
};

type LastFinisher = {
  RaceNr: number;
  Run: number;
  LastPoint: string;
  CompletedDistance: number;
  Position: number;
  InResult: boolean;
  RaceTime: number;
  Status: string;
  Times: Array<{
    RaceTime: number;
    TimeGap: number;
    Position: number;
    Speed: number;
  }>;
  Speed: number;
  StatusTime: number;
  SortOrder: number;
  ExpectedStartTime: number;
};

type Results = {
  RaceNr: number;
  Run: number;
  LastPoint: string;
  CompletedDistance: number;
  Position: number;
  InResult: boolean;
  RaceTime: number;
  Status: string;
  Times: Array<{
    RaceTime: number;
    TimeGap: number;
    Position: number;
    Speed: number;
  }>;
  Speed: number;
  StatusTime: number;
  SortOrder: number;
  ExpectedStartTime: number;
};

export type EventContext = {
  ContextName: string;
  DisplayName: string;
  Riders: { [key: string]: Rider };
  OnTrack: OnTrack[];
  LastFinisher: LastFinisher[];
  Results: Results[];
  NextToStart: number[];
};

export type RaceResult = {
  EventId: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  RoundNumber: number;
  Year: number;
  CategoryName: string;
  RaceName: string;
} & EventContext;
