import React from 'react';

import { useHomeDataFetch } from 'pages/home/hooks/useHomeDataFetch';

import { MainLayout } from 'components/MainLayout';
import { VirtualizedList } from 'components/VirtualizedList';
import { SuperheroCard } from 'components/SuperheroCard/SuperheroCard';

const Home = () => {
  const { superheroes, isLoading } = useHomeDataFetch();

  return (
    <MainLayout title={'Home'}>
      {isLoading ? 'Loading...' : (
        <VirtualizedList
          itemCount={superheroes.length}
          itemSize={500}
          renderItem={({ index, isScrolling }) => {
            const { biography, images } = superheroes[index];

            return (
              <SuperheroCard
                image={images.md}
                title={biography.fullName}
                description={biography.publisher}
              />
            );
          }}
        />
      )}
    </MainLayout>
  );
};

export default Home;

if (process.env.NODE_ENV !== 'production') {
  Home.displayName = 'Home';
}
