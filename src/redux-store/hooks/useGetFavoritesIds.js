import { useSelector } from 'react-redux';
import { useGetSuperheroesIds } from 'redux-store/hooks/useGetSuperheroesIds';
import { selectFavoritesIds } from 'redux-store/rootReducer';

export const useGetFavoritesIds = () => {
  const { isLoading, isSuccess } = useGetSuperheroesIds();
  const favoritesIds = useSelector(selectFavoritesIds);

  return { isLoading, isSuccess, favoritesIds: isSuccess ? favoritesIds : undefined };
};
