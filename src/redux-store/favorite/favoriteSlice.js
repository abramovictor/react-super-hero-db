import { createSlice } from '@reduxjs/toolkit';
import { localStorage } from 'helpers/localStorage';

export const favoriteSlice = createSlice({
  name: 'favoriteSuperheroes',
  initialState: localStorage.getItem('favoriteSuperheroes', {}),
  reducers: {
    addToFavorite: (state, action) => {
      const { id } = action.payload;
      state[id] = true;
      localStorage.setItem('favoriteSuperheroes', state);
    },
    removeFromFavorite: (state, action) => {
      const { id } = action.payload;
      state[id] = false;
      localStorage.setItem('favoriteSuperheroes', state);
    },
  },
});

export default favoriteSlice.reducer;
export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;

export const selectIsFavoriteSuperhero = (state, id) => {
  if (id in state) {
    return state[id];
  }

  return false;
};
