import { useDispatch, useSelector } from 'react-redux';
import { selectIsFavoriteSuperhero } from 'redux-store/rootReducer';
import { addToFavorite, removeFromFavorite } from 'redux-store/favorite/favoriteSlice';

export const useIsFavoriteSuperhero = id =>
  useSelector(state => selectIsFavoriteSuperhero(state, id));

export const useFavoriteSuperhero = id => {
  const isFavorite = useIsFavoriteSuperhero(id);

  const dispatch = useDispatch();
  const add = () => dispatch(addToFavorite({ id }));
  const remove = () => dispatch(removeFromFavorite({ id }));
  const toggle = () => dispatch(isFavorite ? removeFromFavorite({ id }) : addToFavorite({ id }));

  return { isFavorite, add, remove, toggle };
};
