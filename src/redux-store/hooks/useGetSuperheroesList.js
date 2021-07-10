import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';

import { fetchSuperheroesList } from 'redux-store/superheroes/superheroesSlice';
import { selectSuperheroesError, selectSuperheroesFetchingStatus, selectSuperheroesList } from 'redux-store/rootReducer';

export const useGetSuperheroesList = () => {
  const dispatch = useDispatch();
  useEffectOnce(() => {
    dispatch(fetchSuperheroesList());
  });

  const { isIdle, isLoading, isSuccess, isError } = useSelector(selectSuperheroesFetchingStatus);
  const superheroesList = useSelector(selectSuperheroesList);
  const error = useSelector(selectSuperheroesError);

  return { isIdle, isLoading, isSuccess, isError, superheroesList, error };
};
