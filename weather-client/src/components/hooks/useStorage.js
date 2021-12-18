const useStorage = () => {
  const setItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getItem = (key) => localStorage.getItem(key);

  const deleteAll = () => localStorage.clear();

  return { setItem, getItem, deleteAll };
};

export default useStorage;
