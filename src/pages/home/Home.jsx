import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { useGetSuperheroesIds } from 'redux-store/hooks/useGetSuperheroesIds';

import { Wrapper } from 'components/Wrapper';
import { SearchBar } from 'components/SearchBar';
import { MainLayout } from 'components/MainLayout';
import { SuperheroCard } from 'components/SuperheroCard';
import { VirtualizedGrid } from 'components/VirtualizedGrid';

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const Home = () => {
  const { isLoading, isSuccess, superheroesIds } = useGetSuperheroesIds();
  const [layout, setLayout] = useState('vertical');

  const handleChangeLayout = () => {
    setLayout(layout => layout === 'vertical' ? 'horizontal' : 'vertical');
  };

  const isVerticalLayout = layout === 'vertical';
  return (
    <MainLayout title={'Home'} appBarChildren={
      <Grid container spacing={2}>
        <Grid item xs>
          <SearchBar/>
        </Grid>
        <Grid item xs={'auto'}>
          <StyledToggleButtonGroup
            exclusive
            size={'small'}
            value={layout}
            onChange={handleChangeLayout}
          >
            <ToggleButton value={'vertical'}>
              <ViewModule/>
            </ToggleButton>
            <ToggleButton value={'horizontal'}>
              <ViewList/>
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Grid>
      </Grid>
    }>
      {isLoading
        ? 'Loading...'
        : isSuccess ? (
          <VirtualizedGrid
            data={superheroesIds}
            of={isVerticalLayout ? 5 : 1}
            rowHeight={isVerticalLayout ? 450 : 175}
            renderItem={({ item }) => (
              <SuperheroCard id={item} layout={layout}/>
            )}
          />
        ) : null}
    </MainLayout>
  );
};

export default Home;

if (process.env.NODE_ENV !== 'production') {
  Home.displayName = 'Home';
}
