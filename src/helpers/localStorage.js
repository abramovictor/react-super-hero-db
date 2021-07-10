const serializer = value => {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

const deserializer = value => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const localStorage = Object.assign({}, window.localStorage, {
  getItem: (key, fallback = null) => {
    const item = deserializer(window.localStorage.getItem(key));
    if (item === null) {
      return typeof fallback === 'function'
        ? fallback()
        : fallback;
    }
    return item;
  },

  setItem: (key, value) => {
    window.localStorage.setItem(key, serializer(value));
  },
});
