const getToken = () => {
  const storedData = localStorage.getItem("access_token");
  const token = {
    headers: {
      Authorization: `Bearer ${storedData}`,
    },
  };
  return token;
};

export default getToken;
