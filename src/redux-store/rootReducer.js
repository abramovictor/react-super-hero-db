import { combineReducers } from '@reduxjs/toolkit';
import superheroesReducer, * as fromSuperheroes from 'redux-store/superheroes/superheroesSlice';
import favoriteSuperheroesReducer, * as fromFavoriteSuperheroes from 'redux-store/favorite/favoriteSlice';

export const rootReducer = combineReducers({
  superheroes: superheroesReducer,
  favoriteSuperheroes: favoriteSuperheroesReducer,
});

export const selectSuperheroesIds = state =>
  fromSuperheroes.selectSuperheroesIds(state.superheroes);

export const selectSuperheroesError = state =>
  fromSuperheroes.selectSuperheroesError(state.superheroes);

export const selectSuperheroesFetchingStatus = state =>
  fromSuperheroes.selectSuperheroesFetchingStatus(state.superheroes);

export const selectSuperheroById = (state, id) =>
  fromSuperheroes.selectSuperheroById(state.superheroes, id);

export const selectSuperheroFromPoolById = (state, id) =>
  fromSuperheroes.selectSuperheroFromPoolById(state.superheroes, id);

export const selectSuperheroFetchingStatusFromPool = (state, id) =>
  fromSuperheroes.selectSuperheroFetchingStatusFromPool(state.superheroes, id);

export const selectIsFavoriteSuperhero = (state, id) =>
  fromFavoriteSuperheroes.selectIsFavoriteSuperhero(state.favoriteSuperheroes, id);

export const selectFavoritesIds = state =>
  fromFavoriteSuperheroes.selectFavoritesIds(state.favoriteSuperheroes);
