import ResultsTable from '~/routes/results/components/ResultsTable';
import Navigation from '~/routes/results/components/Navigation';
import RaceInfo from '~/routes/results/components/RaceInfo';
import { redirect } from '@remix-run/router';

const raceNavigationItems = [{ label: 'Fort William', id: 'fort-william' }];
const categoryNavigationItems = [
  { label: 'Women Elite', id: 'women-elite' },
  { label: 'Men Elite', id: 'men-elite' },
  { label: 'Junior Women', id: 'junior-women' },
  { label: 'Junior Men', id: 'junior-men' },
];
const dayNavigationItems = [
  { label: 'Timed Training', id: 'timed-training' },
  { label: 'Qualifying', id: 'qualifying' },
  { label: 'Semifinals', id: 'semifinals' },
  { label: 'Finals', id: 'finals' },
];


const Results: React.FC = () => {
  return (
    <main>
      <header>
        <Navigation navigationItems={raceNavigationItems} type="race" />
        <Navigation navigationItems={categoryNavigationItems} type="category" />
        <Navigation navigationItems={dayNavigationItems} type="day" />
        <RaceInfo />
      </header>
      <ResultsTable />
    </main>
  );
};

export default Results;
