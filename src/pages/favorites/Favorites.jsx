import React from 'react';

import { ContentView } from 'components/ContentView';
import { useGetFavoritesIds } from 'redux-store/hooks/useGetFavoritesIds';

const Favorites = () => {
  const { isLoading, isSuccess, favoritesIds } = useGetFavoritesIds();

  return (
    <ContentView
      isLoading={isLoading}
      isSuccess={isSuccess}
      title={'Favorites'}
      data={favoritesIds}
    />
  );
};

export default Favorites;

if (process.env.NODE_ENV !== 'production') {
  Favorites.displayName = 'Favorites';
}
