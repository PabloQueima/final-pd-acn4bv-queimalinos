export const StorageService = {
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  load(key, fallback = null) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};
