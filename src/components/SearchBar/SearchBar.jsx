import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';
import debounce from 'lodash/debounce';

import { SuperheroApi } from 'api/superhero';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const useSearchSuperhero = () => {
  const [name, setName] = useState('');

  const { data = [], isFetching } = useQuery(
    ['home', 'search', name],
    () => SuperheroApi.fetchSearchedByName({ name }),
    {
      keepPreviousData: true,
      enabled: typeof name === 'string' && name.length > 2,
    },
  );

  const searchByName = useMemo(() => {
    return debounce(setName, 500, { leading: true });
  }, []);

  return { searchedList: name.length > 0 ? data : [], isFetching, searchByName };
};

const useStyles = makeStyles({ searchBar: { flexGrow: 1 } });

export const SearchBar = () => {
  const classes = useStyles();
  const { searchedList, isFetching, searchByName } = useSearchSuperhero();

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={searchedList}
      className={classes.searchBar}
      getOptionLabel={superhero => superhero.name}
      renderInput={params => (
        <TextField
          {...params}
          label={'Search'}
          size={'small'}
          margin={'none'}
          variant={'outlined'}
          InputProps={{
            ...params.InputProps,
            endAdornment: isFetching ? <CircularProgress size={20}/> : null,
          }}
          onInput={event => searchByName(event.target.value)}
        />
      )}
    />
  );
};

if (process.env.NODE_ENV !== 'production') {
  SearchBar.displayName = 'HomeSearchBar';
}
