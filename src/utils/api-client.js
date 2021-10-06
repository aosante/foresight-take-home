const client = (endpoint, customConfig = {}) => {
  const config = {
    method: 'GET',
    ...customConfig,
  };

  return fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, config).then(
    async (response) => {
      const data = await response.json();
      if (response.ok && data) {
        return data.data;
      } else {
        return Promise.reject(data);
      }
    }
  );
};

export { client };
