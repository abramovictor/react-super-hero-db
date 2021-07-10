import { useSelectSuperheroById } from 'redux-store/hooks/useSelectSuperheroById';

export const useGetSuperhero = id => {
  const { superhero } = useSelectSuperheroById(id);
};
