import { useAuth } from '~/providers/AuthProvider';
import React, { useEffect, useState } from 'react';
import { ChartBarIcon } from '@heroicons/react/20/solid';
import Header from '~/components/Header';
import { NavigationItem } from '~/routes/results/components/Navigation';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { getSupabaseServerClient } from '~/lib/supabase/supabaseClient';
import { redirect } from '@remix-run/router';
import { useNavigate } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
  // const dataLoader = async () => {
  const supabaseClient = getSupabaseServerClient(request);
  const response = await supabaseClient.auth.getUser();
  if (!response?.data?.user) {
    return redirect('/login');
  }
  return {};
}

const Login: React.FC = () => {
  const { signInUser, isSignedIn } = useAuth();
  const [emailValue, setEmailValue] = useState('');
  const [didSubmit, setDidSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/results');
    }
  }, [isSignedIn]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const signIn = async () => {
    setDidSubmit(true);
    signInUser(emailValue).then();
  };

  return (
    <div className="flex min-h-full flex-1">
      <Header hideLogin />

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <ChartBarIcon className="mx-auto h-10 w-auto text-sky-500" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in or Create an account
          </h2>
        </div>
        {didSubmit ? (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <p className="block text-sm font-medium text-center leading-6 text-white">
                <p className="text-lg">
                  <b>Check your email for the sign in link.</b>
                </p>
                <br /> If you don’t see it, remember to check your spam folder.
                <br /> <br />
                Refresh the page and enter your email address to send another link.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={emailValue}
                    onChange={handleEmailChange}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={signIn}
                  className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src="https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2019/07/05/55b2f4bf-5b61-4a8d-aa61-4ad069436c78/dh-vallnord-world-cup-qualifying-loic-bruni"
        />
      </div>
    </div>
  );
};

export default Login;
