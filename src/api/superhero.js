import { httpClient } from 'services/httpClent';

export const SuperheroApi = {
  getAll: async () => {
    const { data } = await httpClient.get('https://akabab.github.io/superhero-api/api/all.json');
    return data;
  },
};
