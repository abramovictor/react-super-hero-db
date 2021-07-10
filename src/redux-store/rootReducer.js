import { combineReducers } from '@reduxjs/toolkit';
import superheroesReducer, * as fromSuperheroes from 'redux-store/superheroes/superheroesSlice';

export const rootReducer = combineReducers({
  superheroes: superheroesReducer,
});

export const selectSuperheroesList = state =>
  fromSuperheroes.selectSuperheroesList(state.superheroes);

export const selectSuperheroesError = state =>
  fromSuperheroes.selectSuperheroesError(state.superheroes);

export const selectSuperheroesFetchingStatus = state =>
  fromSuperheroes.selectSuperheroesFetchingStatus(state.superheroes);
