import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { SuperheroApi } from 'api/superhero';
import * as fromRoot from 'redux-store/rootReducer';

export const fetchSuperheroesList = createAsyncThunk(
  'charactersList',
  async () => {
    try {
      return await SuperheroApi.fetchAllCharacters();
    } catch (e) {
      throw e;
    }
  },
  {
    condition: (_, { getState }) => {
      const { isSuccess, isLoading } = fromRoot.selectSuperheroesFetchingStatus(getState());
      return !(isLoading || isSuccess);
    },
  },
);

export const fetchSuperheroById = createAsyncThunk(
  'character',
  async ({ id }) => {
    try {
      return await SuperheroApi.fetchCharacterById({ id });
    } catch (e) {
      throw e;
    }
  },
  {
    condition: ({ id }, { getState }) => {
      const superhero = fromRoot.selectSuperheroById(getState(), id);
      return !superhero;
    },
  },
);

const superheroesSlice = createSlice({
  name: 'superheroes',
  initialState: {
    characters: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      response: null,
      error: null,
    },
    charactersPool: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      error: null,
      response: {},
    },
  },
  extraReducers: {
    [fetchSuperheroesList.pending]: state => {
      state.characters.isLoading = true;
    },
    [fetchSuperheroesList.fulfilled]: (state, action) => {
      state.characters.isLoading = false;
      state.characters.isSuccess = true;
      state.characters.response = action.payload;
    },
    [fetchSuperheroesList.rejected]: (state, action) => {
      state.characters.isLoading = false;
      state.characters.isError = true;
      state.characters.error = action.payload;
    },
  },
});

export default superheroesSlice.reducer;

export const selectSuperheroFromPoolById = (state, id) => {
  if (id in state.charactersPool.response) {
    return state.charactersPool.response[id];
  }
};

export const selectSuperheroById = (state, id) => {
  const superheroFromPool = selectSuperheroFromPoolById(state, id);

  if (superheroFromPool) {
    return superheroFromPool;
  }

  if (state.characters.response) {
    return state.characters.response.pool[id];
  }
};

export const selectSuperheroesIds = state => {
  if (state.characters.response) {
    return state.characters.response.ids;
  }
};

export const selectSuperheroesError = state => {
  if (state.characters.error) {
    return state.characters.error;
  }
};

export const selectSuperheroesFetchingStatus = createSelector(
  [
    state => state.characters.isLoading,
    state => state.characters.isSuccess,
    state => state.characters.isError,
  ],
  (isLoading, isSuccess, isError) => ({ isLoading, isSuccess, isError }),
);
