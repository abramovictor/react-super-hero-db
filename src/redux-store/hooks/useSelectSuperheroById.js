import { useSelector } from 'react-redux';
import { selectSuperheroById } from 'redux-store/rootReducer';

export const useSelectSuperheroById = id => {
  const superhero = useSelector(state => selectSuperheroById(state, id));
  return { superhero };
};
