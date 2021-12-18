const useStorage = () => {
  const setItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getItem = (key) => localStorage.getItem(key);

  return { setItem, getItem };
};

export default useStorage;
