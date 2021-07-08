import { useQuery } from 'react-query';
import { SuperheroApi } from 'api/superhero';

export const useHomeDataFetch = () => {
  const { data: superheroes, ...rest } = useQuery(['home', 'all-superhero'], SuperheroApi.getAll);
  return { superheroes, ...rest };
};
