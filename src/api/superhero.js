import { normalizeData } from 'helpers/normalizeData';
import { httpClient } from 'services/httpClent';

export const SuperheroApi = {
  fetchAllCharacters: async () => {
    const { data } = await httpClient.get('https://akabab.github.io/superhero-api/api/all.json');
    return normalizeData(data, item => {
      const { lg: url } = item.images;
      item.images = { url };
      return { id: item.id, item };
    });
  },

  fetchSearchedByName: async params => {
    const { name } = params;
    const { data } = await httpClient.get(`/search/${name}`);
    return data.results;
  },

  fetchCharacterById: async params => {
    const { id } = params;
    const { data } = await httpClient.get(`/${id}`);
    return data;
  },
};
