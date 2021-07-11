import { localStorage } from 'helpers/localStorage';
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CircularProgress  from '@material-ui/core/CircularProgress';

import { Layout } from 'components/Layout';
import { SearchBar } from 'components/SearchBar';
import { Fullscreen } from 'components/Fullscreen';
import { SuperheroCard } from 'components/SuperheroCard';
import { VirtualizedGrid } from 'components/VirtualizedGrid';

const spinner = (
  <Fullscreen>
    <CircularProgress size={100}/>
  </Fullscreen>
);

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

export const ContentView = props => {
  const { title, isLoading, isSuccess, data } = props;
  const [layout, setLayout] = useState(() => localStorage.getItem('contentViewLayout', 'vertical'));

  const handleChangeLayout = () => {
    setLayout(layout => {
      layout = layout === 'vertical' ? 'horizontal' : 'vertical';
      localStorage.setItem('contentViewLayout', layout);
      return layout;
    });
  };

  const isVerticalLayout = layout === 'vertical';
  return (
    <Layout title={title} appBarChildren={
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
        ? spinner
        : isSuccess ? (
          <VirtualizedGrid
            data={data}
            of={isVerticalLayout ? 5 : 1}
            rowHeight={isVerticalLayout ? 450 : 175}
            renderItem={({ item }) => (
              <SuperheroCard id={item} layout={layout}/>
            )}
          />
        ) : null}
    </Layout>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ContentView.displayName = 'ContentView';
}
