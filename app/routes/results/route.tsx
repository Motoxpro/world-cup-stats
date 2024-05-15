import ResultsTable from '~/routes/results/components/ResultsTable';
import Navigation, { NavigationItem } from '~/routes/results/components/Navigation';
import RaceInfo from '~/routes/results/components/RaceInfo';
import { defer, redirect } from '@remix-run/router';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { getSupabaseBrowserClient, getSupabaseServerClient } from '~/lib/supabase/supabaseClient';
import { useLoaderData } from '@remix-run/react';
import NotVerified from '~/routes/results/NotVerified';
import React, { useEffect, useState } from 'react';
import { useEnv } from '~/providers/EnvProvider';
import {
  categoryNavigationItems,
  dayNavigationItems,
  raceNavigationItems,
  useNavigation,
} from '~/providers/NavigationProvider';
import { analyzeRiders } from '~/routes/results/analysis/analysis';

type LoaderData = {
  isVerified: boolean;
  raceNavigationItems: NavigationItem[];
};
export async function loader({ request }: LoaderFunctionArgs) {
  // const dataLoader = async () => {
  const supabaseClient = getSupabaseServerClient(request);
  const response = await supabaseClient.auth.getUser();
  if (!response?.data?.user) {
    return redirect('/login');
  }
  return {
    isVerified: response.data.user?.user_metadata.is_verified ?? false,
  };
}

const Results: React.FC = () => {
  const { isVerified } = useLoaderData<LoaderData>();
  const env = useEnv();
  const supabase = getSupabaseBrowserClient(env);
  const { currentPath } = useNavigation();
  const [raceData, setRaceData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from('Events')
        .select(
          'Location, RoundNumber, Year, CategoryName, RaceName, StartDate, EndDate, SplitTimes(*, Riders(*))',
        )
        .eq('Location', currentPath.race)
        .eq('CategoryName', currentPath.category)
        .eq('RaceName', currentPath.day);

      if (error) {
        console.error('Error getting user:', error.message);
        return;
      }
      setRaceData(data);
    };
    (async () => {
      const taskListener = supabase
        .channel('public:data')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'SplitTimes' },
          async (payload) => {
            getData();
          },
        )
        .subscribe();
      getData();
      return () => {
        return taskListener.unsubscribe();
      };
    })();
  }, [JSON.stringify(currentPath)]);

  if (!isVerified) {
    return <NotVerified />;
  }

  return (
    <main>
      <header>
        <Navigation navigationItems={raceNavigationItems} type="race" />
        <Navigation navigationItems={categoryNavigationItems} type="category" />
        <Navigation navigationItems={dayNavigationItems} type="day" />
        <RaceInfo raceData={raceData} />
      </header>
      <ResultsTable raceData={raceData} />
    </main>
  );
};

export default Results;
