import React, { Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useScrollRestoration } from 'components/App/hooks/useScrollRestoration';
import { ThemeProvider } from 'components/App/ThemeProvider';

const Home = React.lazy(() => {
  return import(
    /* webpackChunkName: "HomePage" */
    /* webpackPreload: true */
    'pages/home');
});

const queryClient = new QueryClient();

export const App = () => {
  useScrollRestoration();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CssBaseline/>

        <Router>
          <Switch>
            <Route path={'/'} exact>
              <Suspense fallback={'Loading...'}>
                <Home/>
              </Suspense>
            </Route>
          </Switch>
        </Router>

        {process.env.NODE_ENV !== 'production' && (
          <ReactQueryDevtools initialIsOpen={false}/>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  App.displayName = 'App';
}
