import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { store } from 'redux-store';

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
      <Provider store={store}>
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
      </Provider>
    </QueryClientProvider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  App.displayName = 'App';
}
