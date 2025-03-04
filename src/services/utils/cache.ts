export const getCache = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.error(`Error reading cache for key "${key}":`, error);
    return null;
  }
};

export const setCache = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting cache for key "${key}":`, error);
  }
};

export const clearCache = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error clearing cache for key "${key}":`, error);
  }
};
