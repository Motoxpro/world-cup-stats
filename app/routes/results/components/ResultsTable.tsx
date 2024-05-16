import React, { useState } from 'react';
import ResultDetail from '~/routes/results/components/ResultDetail';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { analyzeRiders } from '~/routes/results/analysis/analysis';

interface ResultsTableProps {
  raceData: RaceData[];
}

// Time formatting function
const formatTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(3);
  return `${minutes}:${seconds.padStart(6, '0')}`;
};

const ResultsTable: React.FC<ResultsTableProps> = ({ raceData }) => {
  const [currentRacer, setCurrentRacer] = useState<any | null>(null);

  const handleRowClick = (racerId: number) => {
    const newRider = analyzedData.find((r) => r.FullName === racerId);
    // setCurrentRacer(newRider);
  };

  const handleResultDetailClose = () => {
    setCurrentRacer(null);
  };

  const [splits, analyzedData] = analyzeRiders(raceData);
  return (
    <div className="border-t border-white/10 pt-11">
      <ResultDetail
        isOpen={!!currentRacer}
        currentRacer={currentRacer}
        onClose={handleResultDetailClose}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Finish Time</TableHeader>
            {(splits ?? []).map((split) => (
              <TableHeader key={split}>{split}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(analyzedData ?? []).map((row) => {
            const riderSplits = row.Splits ? Object.entries(row.Splits) : [];
            return (
              <TableRow
                key={row.FullName}
                className="hover:bg-gray-800"
                onClick={() => handleRowClick(row.FullName)}
              >
                <TableCell className="px-6 py-4 whitespace-nowrap font-medium text-gray-400">
                  {row.FullName}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-400">
                  {row.FinishTime ? formatTime(row.FinishTime) : 'N/A'}
                </TableCell>
                {riderSplits.map(([split, analysis]) =>
                  (analysis.SplitTime ? (
                    <TableCell key={split} className="px-6 py-4 whitespace-nowrap  text-gray-400">
                      <div className="flex justify-between">
                        <div className="">Split:</div>
                        <div className="ml-2 font-bold">{formatTime(analysis.SplitTime)}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="">Pos:</div>
                        <div className="ml-2 font-bold">{analysis.SplitPosition}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="">Lost:</div>
                        <div className="ml-2 font-bold">{formatTime(analysis.TimeLost)}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="">SecTime:</div>
                        <div className="ml-2 font-bold">{formatTime(analysis.SectorTime)}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="">SecPos:</div>
                        <div className="ml-2 font-bold">{analysis.SectorPosition}</div>
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell key={split} className="px-6 py-4 whitespace-nowrap text-gray-500">
                      N/A
                    </TableCell>
                  )),)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default ResultsTable;
