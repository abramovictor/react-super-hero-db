const defaultExtractor = (item, idx, list) => ({ id: item.id, item });

/**
 * @typedef {{ ids: Array, pool: Object, data: Array, indices: Object }} NormalizedData
 */

/**
 * @template {Array} T
 * @param {T} raw
 * @param {function(T, number, Array): { id: string | number, item: * }} [extractor]
 * @return {NormalizedData}
 */
export const normalizeData = (raw, extractor = defaultExtractor) => {
  const normalizedData = { ids: [], pool: {}, data: [], indices: {} };

  raw.forEach((rawItem, idx, list) => {
    const { id, item } = extractor(rawItem, idx, list);
    normalizedData.ids.push(id);
    normalizedData.indices[id] = idx;
    normalizedData.pool[id] = item;
    normalizedData.data.push(item);
  });

  return normalizedData;
};
