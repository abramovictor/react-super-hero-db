import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { SuperheroApi } from 'api/superhero';
import * as fromRoot from 'redux-store/rootReducer';

export const fetchSuperheroesList = createAsyncThunk(
  'superheroesList',
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

const superheroesSlice = createSlice({
  name: 'superheroes',
  initialState: {
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    response: null,
    error: null,
  },
  extraReducers: {
    [fetchSuperheroesList.pending]: state => {
      state.isIdle = false;
      state.isLoading = true;
    },
    [fetchSuperheroesList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.response = action.payload;
    },
    [fetchSuperheroesList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default superheroesSlice.reducer;

export const selectSuperheroesList = state => {
  if (state.response) {
    return state.response.data;
  }
  return null;
};

export const selectSuperheroesError = state => {
  if (state.error) {
    return state.error;
  }
  return null;
};

export const selectSuperheroesFetchingStatus = createSelector(
  [
    state => state.isIdle,
    state => state.isLoading,
    state => state.isSuccess,
    state => state.isError,
  ],
  (isIdle, isLoading, isSuccess, isError) => ({ isIdle, isLoading, isSuccess, isError }),
);
