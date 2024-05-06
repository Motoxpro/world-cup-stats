import ResultsTable from '~/routes/results/components/ResultsTable';
import Navigation from '~/routes/results/components/Navigation';
import RaceInfo from '~/routes/results/components/RaceInfo';
import { redirect } from '@remix-run/router';
import { useAuth } from '~/providers/AuthProvider';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { getSupabaseServerClient } from '~/lib/supabase/supabaseClient';
import { useLoaderData } from '@remix-run/react';
import NotVerified from '~/routes/results/NotVerified';

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

type LoaderData = {
  isVerified: boolean;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const supabaseClient = getSupabaseServerClient(request);
  const response = await supabaseClient.auth.getUser();
  if (!response?.data?.user) {
    return redirect('/login');
  }
  return { isVerified: response.data.user?.user_metadata.isVerified };
}

const Results: React.FC = () => {
  const { isVerified } = useLoaderData<LoaderData>();

  if (!isVerified) {
    return <NotVerified />;
  }
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
