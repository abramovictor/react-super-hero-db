import { combineReducers } from '@reduxjs/toolkit';
import superheroesReducer, * as fromSuperheroes from 'redux-store/superheroes/superheroesSlice';
import favoriteSuperheroesReducer, * as fromFavoriteSuperheroes from 'redux-store/favorite/favoriteSlice';

export const rootReducer = combineReducers({
  superheroes: superheroesReducer,
  favoriteSuperheroes: favoriteSuperheroesReducer,
});

export const selectSuperheroesList = state =>
  fromSuperheroes.selectSuperheroesList(state.superheroes);

export const selectSuperheroesError = state =>
  fromSuperheroes.selectSuperheroesError(state.superheroes);

export const selectSuperheroesFetchingStatus = state =>
  fromSuperheroes.selectSuperheroesFetchingStatus(state.superheroes);

export const selectIsFavoriteSuperhero = (state, id) =>
  fromFavoriteSuperheroes.selectIsFavoriteSuperhero(state.favoriteSuperheroes, id);
