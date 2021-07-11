import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSuperheroFetchingStatusFromPool } from 'redux-store/rootReducer';

import { fetchSuperheroById } from 'redux-store/superheroes/superheroesSlice';
import { useSelectSuperheroById } from 'redux-store/hooks/useSelectSuperheroById';

export const useGetSuperhero = id => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSuperheroById({ id }));
  }, [id, dispatch]);

  const { superhero } = useSelectSuperheroById(id);
  const { isSuccess, isLoading, isError } = useSelector(state => selectSuperheroFetchingStatusFromPool(state, id));

  return { superhero, isSuccess, isLoading, isError };
};
