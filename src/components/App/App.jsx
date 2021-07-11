import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';

import { store } from 'redux-store';

import { Fullscreen } from 'components/Fullscreen';

import { useScrollRestoration } from 'components/App/hooks/useScrollRestoration';
import { ThemeProvider } from 'components/App/ThemeProvider';

const fallback = (
  <Fullscreen>
    <CircularProgress size={100}/>
  </Fullscreen>
);

const Home = React.lazy(() => {
  return import(
    /* webpackChunkName: "HomePage" */
    /* webpackPreload: true */
    'pages/home');
});

const Superhero = React.lazy(() => {
  return import(
    /* webpackChunkName: "SuperheroPage" */
    /* webpackPreload: true */
    'pages/superhero');
});

const Favorites = React.lazy(() => {
  return import(
    /* webpackChunkName: "FavoritesPage" */
    /* webpackPreload: true */
    'pages/favorites');
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
                <Suspense fallback={fallback}>
                  <Home/>
                </Suspense>
              </Route>
              <Route path={'/superhero/:id'} exact>
                <Suspense fallback={fallback}>
                  <Superhero/>
                </Suspense>
              </Route>
              <Route path={'/favorites'} exact>
                <Suspense fallback={fallback}>
                  <Favorites/>
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
