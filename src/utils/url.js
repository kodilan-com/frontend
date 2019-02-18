export const normalizeUrl = (url) => {
  if (!url) {
    return '';
  }

  return url.indexOf('http') > -1 ? url : `http://${url}`;
};
