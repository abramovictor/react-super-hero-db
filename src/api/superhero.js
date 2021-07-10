import { normalizeData } from 'helpers/normalizeData';
import { httpClient } from 'services/httpClent';

export const SuperheroApi = {
  fetchAllCharacters: async () => {
    const { data } = await httpClient.get('https://akabab.github.io/superhero-api/api/all.json');
    return normalizeData(data);
  },
};
