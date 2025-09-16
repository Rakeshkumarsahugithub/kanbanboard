export const StorageManager = {
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Storage save failed:', error);
    }
  },
  load(key, fallback = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (error) {
      console.error('Storage load failed:', error);
      return fallback;
    }
  }
};
