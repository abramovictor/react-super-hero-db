import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';

import { fetchSuperheroesList } from 'redux-store/superheroes/superheroesSlice';
import { selectSuperheroesError, selectSuperheroesFetchingStatus, selectSuperheroesIds } from 'redux-store/rootReducer';

export const useGetSuperheroesIds = () => {
  const dispatch = useDispatch();
  useEffectOnce(() => {
    dispatch(fetchSuperheroesList());
  });

  const { isLoading, isSuccess, isError } = useSelector(selectSuperheroesFetchingStatus);
  const superheroesIds = useSelector(selectSuperheroesIds);
  const error = useSelector(selectSuperheroesError);

  return { isLoading, isSuccess, isError, superheroesIds, error };
};
