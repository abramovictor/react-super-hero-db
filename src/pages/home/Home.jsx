import React from 'react';

import { MainLayout } from 'components/MainLayout';
import { VirtualizedGrid } from 'components/VirtualizedList';
import { SuperheroCard } from 'components/SuperheroCard';
import { useGetSuperheroesList } from 'redux-store/hooks/useGetSuperheroesList';

const Home = () => {
  const { isLoading, isSuccess, superheroesList } = useGetSuperheroesList();

  return (
    <MainLayout title={'Home'}>
      {isLoading
        ? 'Loading...'
        : isSuccess
          ? (
            <VirtualizedGrid
              data={superheroesList}
              of={5}
              rowHeight={450}
              renderItem={({ item }) => {
                const { name, biography, images } = item;

                return (
                  <SuperheroCard
                    image={images.md}
                    title={name}
                    description={biography.publisher}
                  />
                );
              }}
            />
          ) : null}
    </MainLayout>
  );
};

export default Home;

if (process.env.NODE_ENV !== 'production') {
  Home.displayName = 'Home';
}
