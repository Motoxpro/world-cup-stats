interface SplitAnalysis {
  SplitTime: number;
  SplitPosition: number;
  TimeLost: number;
  SectorTime: number;
  SectorPosition: number;
}

interface RiderAnalysis {
  FullName: string;
  Nation: string;
  FinishTime: number | null;
  Splits: { [key: string]: SplitAnalysis };
}

export const analyzeRiders = (data: RaceData[]): (Set<string> | RiderAnalysis[])[] => {
  const riderMap: { [key: string]: RiderAnalysis } = {};
  const splitPoints: { [key: string]: SplitTime[] } = {};
  const uniqueSplitPoints = new Set<string>();
  let sortedSplitPointNames: string[] = [];

  data.forEach((race) => {
    if (!race.SplitTimes) {
      return;
    }
    race.SplitTimes.forEach((split) => {
      const riderId = split.Riders.UciRiderId + split.Run;
      if (!riderMap[riderId]) {
        riderMap[riderId] = {
          FullName: split.Riders.FullName,
          Nation: split.Riders.Nation,
          FinishTime: null,
          Splits: {},
        };
      }

      const rider = riderMap[riderId];

      // Collect split times for later analysis
      const lastPoint = split.LastPoint || 'P0';
      if (!splitPoints[lastPoint]) {
        splitPoints[lastPoint] = [];
      }
      splitPoints[lastPoint].push(split);
      uniqueSplitPoints.add(lastPoint);

      // Store the split time
      rider.Splits[lastPoint] = {
        splitNumber: lastPoint.substring(1),
        SplitTime: split.RaceTime,
        SplitPosition: 0, // Placeholder, will be calculated later
        TimeLost: 0, // Placeholder, will be calculated later
        SectorTime: 0, // Placeholder, will be calculated later
        SectorPosition: 0, // Placeholder, will be calculated later
      };

      // If the rider is in the result, update the finish time
      // console.log(rider.FinishTime, split.InResult, split.RaceTime)
      if (split.InResult) {
        rider.FinishTime = split.RaceTime;
      }
    });
  });

  // Convert unique split points to an array and sort them numerically
  sortedSplitPointNames = Array.from(uniqueSplitPoints).sort((a, b) => {
    const numA = parseInt(a.substring(1));
    const numB = parseInt(b.substring(1));
    return numA - numB;
  });

  // Calculate split positions, time lost, and sector times
  sortedSplitPointNames.forEach((lastPointName, index) => {
    const splits = splitPoints[lastPointName];

    // Sort by SplitTime to determine positions
    splits.sort((a, b) => a.RaceTime - b.RaceTime);

    // Calculate SplitPosition and TimeLost
    const fastestTime = splits[0].RaceTime;
    splits.forEach((split, index) => {
      const riderAnalysis = riderMap[split.Riders.UciRiderId];
      const analysis = riderAnalysis.Splits[lastPointName];
      analysis.SplitPosition = index + 1;
      analysis.TimeLost = split.RaceTime - fastestTime;
    });

    // Calculate SectorTimes and SectorPositions
    splits.forEach((split) => {
      const riderId = split.Riders.UciRiderId;
      const riderAnalysis = riderMap[riderId];
      const analysis = riderAnalysis.Splits[lastPointName];
      const previousPoint = sortedSplitPointNames[index - 1];

      if (previousPoint && riderAnalysis.Splits[previousPoint]) {
        const previousTime = riderAnalysis.Splits[previousPoint].SplitTime;
        analysis.SectorTime = analysis.SplitTime - previousTime;
      } else {
        analysis.SectorTime = analysis.SplitTime;
      }

      // Collect sector times for ranking
      splitPoints[lastPointName].forEach((s) => {
        const rId = s.Riders.UciRiderId;
        const rAnalysis = riderMap[rId];
        const rSplit = rAnalysis.Splits[lastPointName];
        if (previousPoint && rAnalysis.Splits[previousPoint]) {
          const prevTime = rAnalysis.Splits[previousPoint].SplitTime;
          rSplit.SectorTime = rSplit.SplitTime - prevTime;
        } else {
          rSplit.SectorTime = rSplit.SplitTime;
        }
      });

      // Sort by SectorTime to determine positions
      const sectorTimes = splitPoints[lastPointName].map((s) => {
        return (
          s.RaceTime -
          (riderMap[s.Riders.UciRiderId].Splits[sortedSplitPointNames[index - 1]]
            ? riderMap[s.Riders.UciRiderId].Splits[sortedSplitPointNames[index - 1]].SplitTime
            : 0)
        );
      });
      sectorTimes.sort((a, b) => a - b);
      splits.forEach((s) => {
        const rId = s.Riders.UciRiderId;
        const rAnalysis = riderMap[rId];
        const rSplit = rAnalysis.Splits[lastPointName];
        rSplit.SectorPosition = sectorTimes.indexOf(rSplit.SectorTime) + 1;
      });
    });
  });

  // Add placeholders for missing split points
  Object.values(riderMap).forEach((rider) => {
    sortedSplitPointNames.forEach((splitPointName) => {
      if (!rider.Splits[splitPointName]) {
        rider.Splits[splitPointName] = {
          splitNumber: splitPointName.substring(1),
          SplitTime: 0,
          SplitPosition: 0,
          TimeLost: 0,
          SectorTime: 0,
          SectorPosition: 0,
        };
      }
    });
  });

  // Sort rider splittimes for every rider by splitNumber
  Object.values(riderMap).forEach((rider) => {
    const sortedSplits = Object.entries(rider.Splits).sort((a, b) => {
      return parseInt(a[1].splitNumber) - parseInt(b[1].splitNumber);
    });
    rider.Splits = Object.fromEntries(sortedSplits);
  });

  const results = Object.values(riderMap);
  // Sort results by finish time
  results.sort((a, b) => {
    if (a.FinishTime === null) {
      return 1;
    }
    if (b.FinishTime === null) {
      return -1;
    }
    return a.FinishTime - b.FinishTime;
  });

  return [sortedSplitPointNames, results];
};
