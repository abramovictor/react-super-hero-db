import React from 'react';

import { MainLayout } from 'components/MainLayout';
import { SearchBar } from 'components/SearchBar';

const Superhero = () => {
  return (
    <MainLayout title={'Home'} appBarChildren={<SearchBar/>}>

    </MainLayout>
  );
};

export default Superhero;

if (process.env.NODE_ENV !== 'production') {
  Superhero.displayName = 'Home';
}
