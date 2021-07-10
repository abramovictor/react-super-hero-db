import { VirtualizedList } from 'components/VirtualizedList';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { MainLayout } from 'components/MainLayout';
import { VirtualizedGrid } from 'components/VirtualizedGrid';
import { SuperheroCard } from 'components/SuperheroCard';
import { useToggle } from 'react-use';
import { useGetSuperheroesList } from 'redux-store/hooks/useGetSuperheroesList';

const Home = () => {
  const { isLoading, isSuccess, superheroesList } = useGetSuperheroesList();
  const [isGrid, toggleIsGrid] = useToggle(false);

  return (
    <MainLayout title={'Home'}>
      {isLoading
        ? 'Loading...'
        : isSuccess
          ? isGrid ? (
            <VirtualizedGrid
              data={superheroesList}
              of={5}
              rowHeight={450}
              renderItem={({ item }) => {
                const { id, name, biography, images } = item;
                return (
                  <SuperheroCard
                    id={id}
                    image={images.md}
                    title={name}
                    description={biography.publisher}
                  />
                );
              }}
            />
          ) : (
            <VirtualizedList
              data={superheroesList}
              itemHeight={250}
              renderItem={({ item }) => {
                const { id, name, biography, images } = item;
                return (
                  <SuperheroCard
                    id={id}
                    image={images.md}
                    title={name}
                    description={biography.publisher}
                  />
                );
              }}
            />
          )
          : null}
    </MainLayout>
  );
};

export default Home;

if (process.env.NODE_ENV !== 'production') {
  Home.displayName = 'Home';
}
