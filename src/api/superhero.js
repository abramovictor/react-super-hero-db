import { httpClient } from 'services/httpClent';
import { normalizeData } from 'helpers/normalizeData';

export const SuperheroApi = {
  fetchAllCharacters: async () => {
    const { data } = await httpClient.get('https://akabab.github.io/superhero-api/api/all.json');
    return normalizeData(data, item => {
      const { lg: url } = item.images;
      delete item.slug;
      delete item.images;

      item.image = { url };
      return { id: item.id, item };
    });
  },

  fetchSearchedByName: async params => {
    const { name } = params;
    const { data } = await httpClient.get(`/search/${name}`);
    return data.results;
  },

  _transformCharacter: response => ({
    id: Number(response.id),
    name: response.name,
    powerstats: {
      intelligence: response.powerstats?.intelligence ? Number(response.powerstats?.intelligence) : '-',
      strength: response.powerstats?.strength ? Number(response.powerstats?.strength) : '-',
      speed: response.powerstats?.speed ? Number(response.powerstats?.speed) : '-',
      durability: response.powerstats?.durability ? Number(response.powerstats?.durability) : '-',
      power: response.powerstats?.power ? Number(response.powerstats?.power) : '-',
      combat: response.powerstats?.combat ? Number(response.powerstats?.combat) : '-',
    },
    biography: {
      fullName: response.biography?.['full-name'] ?? '-',
      alterEgos: response.biography?.['alter-egos'] ?? '-',
      aliases: response.biography?.aliases ?? '-',
      placeOfBirth: response.biography?.['place-of-birth'] ?? '-',
      firstAppearance: response.biography?.['first-appearance'] ?? '-',
      publisher: response.biography?.publisher ?? '-',
      alignment: response.biography?.alignment ?? '-',
    },
    appearance: {
      gender: response.appearance?.gender ?? '-',
      race: response.appearance?.race ?? '-',
      height: response.appearance?.height ?? '-',
      weight: response.appearance?.weight ?? '-',
      eyeColor: response.appearance?.['eye-color'] ?? '-',
      hairColor: response.appearance?.['hair-color'] ?? '-',
    },
    work: {
      occupation: response.work?.occupation ?? '-',
      base: response.work?.base ?? '-',
    },
    connections: {
      groupAffiliation: response.connections?.['group-affiliation'] ?? '-',
      relatives: response.connections?.relatives ?? '-',
    },
    image: {
      url: response.image?.url,
    },
  }),

  fetchCharacterById: async params => {
    const { id } = params;
    const { data } = await httpClient.get(`/${id}`);
    return SuperheroApi._transformCharacter(data);
  },
};
