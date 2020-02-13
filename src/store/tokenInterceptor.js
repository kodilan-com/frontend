export default (acc) => {
  const token = localStorage.getItem('AccessToken');
  if (token !== null) {
    acc.headers.Authorization = `Bearer ${token}`;
  }
  return acc;
};
