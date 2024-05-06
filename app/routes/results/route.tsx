import ResultsTable from '~/routes/results/components/ResultsTable';
import Navigation, { NavigationItem } from '~/routes/results/components/Navigation';
import RaceInfo from '~/routes/results/components/RaceInfo';
import { redirect } from '@remix-run/router';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { getSupabaseServerClient } from '~/lib/supabase/supabaseClient';
import { useLoaderData } from '@remix-run/react';
import NotVerified from '~/routes/results/NotVerified';
import React from 'react';

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

type LoaderData = {
  isVerified: boolean;
  raceNavigationItems: NavigationItem[];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const supabaseClient = getSupabaseServerClient(request);
  const response = await supabaseClient.auth.getUser();
  if (!response?.data?.user) {
    return redirect('/login');
  }
  // Check to see if there are no query params. If so, redirect to the closest race
  const closestRace = 'fort-william';
  if (!request.url.includes('?')) {
    return redirect(`/results?race=${closestRace}&category=women-elite&day=timed-training`);
  }
  return {
    isVerified: response.data.user?.user_metadata.isVerified,
    raceNavigationItems: [
      {
        id: 'fort-william',
        label: 'Fort William',
      },
    ],
  };
}

const Results: React.FC = () => {
  const { isVerified, raceNavigationItems } = useLoaderData<LoaderData>();

  const raceData = [];

  // TODO: Uncomment this once the user verification is implemented
  // if (!isVerified) {
  //   return <NotVerified />;
  // }

  return (
    <main>
      <header>
        <Navigation navigationItems={raceNavigationItems} type="race" />
        <Navigation navigationItems={categoryNavigationItems} type="category" />
        <Navigation navigationItems={dayNavigationItems} type="day" />
        <RaceInfo />
      </header>
      <ResultsTable data={raceData} />
    </main>
  );
};

export default Results;
