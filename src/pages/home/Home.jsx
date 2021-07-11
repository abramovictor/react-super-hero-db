import React from 'react';

import { useGetSuperheroesIds } from 'redux-store/hooks/useGetSuperheroesIds';
import { ContentView } from 'components/ContentView';

const Home = () => {
  const { isLoading, isSuccess, superheroesIds } = useGetSuperheroesIds();

  return (
    <ContentView
      isLoading={isLoading}
      isSuccess={isSuccess}
      title={'Home'}
      data={superheroesIds}
    />
  );
};

export default Home;

if (process.env.NODE_ENV !== 'production') {
  Home.displayName = 'Home';
}
