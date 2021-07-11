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
      const superhero = fromRoot.selectSuperheroFromPoolById(getState(), id);
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
      data: null,
      error: null,
    },
    charactersPool: {},
  },
  reducers: {
    editCharacter: (state, action) => {
      const { id, data } = action.payload;
      state.charactersPool[id].data = data;
    },
  },
  extraReducers: {
    [fetchSuperheroesList.pending]: state => {
      state.characters.isLoading = true;
    },
    [fetchSuperheroesList.fulfilled]: (state, action) => {
      state.characters.isLoading = false;
      state.characters.isSuccess = true;
      state.characters.data = action.payload;
    },
    [fetchSuperheroesList.rejected]: (state, action) => {
      state.characters.isLoading = false;
      state.characters.isError = true;
      state.characters.error = action.payload;
    },

    [fetchSuperheroById.pending]: (state, action) => {
      const { id } = action.meta.arg;
      if (!state.charactersPool[id]) {
        state.charactersPool[id] = {};
      }

      state.charactersPool[id].isLoading = true;
    },
    [fetchSuperheroById.fulfilled]: (state, action) => {
      const { id } = action.meta.arg;
      state.charactersPool[id].isLoading = false;
      state.charactersPool[id].isSuccess = true;
      state.charactersPool[id].data = action.payload;
    },
    [fetchSuperheroById.rejected]: (state, action) => {
      const { id } = action.meta.arg;
      state.charactersPool[id].isLoading = false;
      state.charactersPool[id].isError = true;
      state.charactersPool[id].error = action.payload;
    },
  },
});

export default superheroesSlice.reducer;

export const { editCharacter } = superheroesSlice.actions;

export const selectSuperheroFromPoolById = (state, id) => {
  if (id in state.charactersPool) {
    return state.charactersPool[id].data;
  }
};

export const selectSuperheroById = (state, id) => {
  const superheroFromPool = selectSuperheroFromPoolById(state, id);

  if (superheroFromPool) {
    return superheroFromPool;
  }

  if (state.characters.data) {
    return state.characters.data.pool[id];
  }
};

export const selectSuperheroesIds = state => {
  if (state.characters.data) {
    return state.characters.data.ids;
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

export const selectSuperheroFetchingStatusFromPool = createSelector(
  [
    (state, id) => state.charactersPool[id]?.isLoading ?? false,
    (state, id) => state.charactersPool[id]?.isSuccess ?? false,
    (state, id) => state.charactersPool[id]?.isError ?? false,
  ],
  (isLoading, isSuccess, isError) => ({ isLoading, isSuccess, isError }),
);
